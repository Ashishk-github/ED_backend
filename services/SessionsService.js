const SessionsRepository = require("../repository/SessionsRepository");
const UserRepository = require("../repository/UserRepository");
const UserAssignmentsService = require("../services/UserAssignmentsService");
const NotesService = require("../services/NotesService");
const jwt = require("jsonwebtoken");

module.exports = class SessionsService {
  constructor() {
    this.sessionsRepository = new SessionsRepository();
    this.userAssignmentsService = new UserAssignmentsService();
    this.userRepository = new UserRepository();
    this.notesService = new NotesService();
  }

  // async submitQuestion(args) {
  //   try {
  //     const { userId, answer } = args;
  //     const user = await this.userRepository.findOne({ _id: userId }).lean();
  //     const sessionId = user?.courses?.currentQuestion?.id;
  //     const session = await this.sessionsRepository.find().lean();
  //     const index = session.findIndex((s) => String(s._id) === sessionId);
  //     let currentQuestion = session[index + 1];
  //     console.log(index, session, sessionId);
  //     const previousQuestion = {
  //       ...user?.courses?.currentQuestion,
  //       endedAt: new Date(),
  //       answer,
  //     };
  //     if (currentQuestion)
  //       currentQuestion = {
  //         id: String(currentQuestion._id),
  //         lessonId: String(currentQuestion.lessonId),
  //         startedAt: new Date(),
  //       };
  //     else currentQuestion = {};
  //     const users = await this.userRepository.updateOne(
  //       { _id: userId },
  //       {
  //         $set: { "courses.currentQuestion": currentQuestion },
  //         $push: { "courses.previousQuestion": previousQuestion },
  //       }
  //     );
  //     return { message: "submited successfully" };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async submitQuestion(args) {
    try {
      const { sessionId, userId, answer } = args;
      console.log(args);
      const [session, user, assignment] = await Promise.all([
        this.sessionsRepository.findOne({ _id: sessionId }).lean(),
        this.userRepository.findOne({ _id: userId }).lean(),
        this.userAssignmentsService.get({ userId, sessionId }),
      ]);
      console.log(assignment[0]);
      const note = {
        userAssignmentId: assignment && assignment[0]?._id,
        answer,
        userId,
      };
      const notes = await this.notesService.create(note);
      const nextSession = await this.sessionsRepository.findOne({
        _id: session.nextQuestion,
      });
      const nextAssignment = await this.userAssignmentsService.create({
        lessonId: nextSession.lessonId,
        sessionId: nextSession._id,
        userId,
      });
      await this.userAssignmentsService.update(
        { _id: assignment._id },
        {
          endedAt: Date.now().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
          answerId: note._id,
          status: "completed",
          isActive: false,
        }
      );
      return { message: "submited successfully" };
    } catch (error) {
      throw error;
    }
  }

  async startQuestion(args) {
    try {
      const { sessionId, userId } = args;
      const start = await this.userAssignmentsService.get({
        sessionId,
        userId,
      });
      if (start[0]?.status === "unlocked") {
        await this.userAssignmentsService.update(
          { _id: start[0]._id },
          {
            $set: {
              status: "inprogress",
              startedAt: Date.now().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              }),
            },
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }
};
