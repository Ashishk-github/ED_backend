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

  async submitQuestion(args) {
    try {
      const { sessionId, userId, answer } = args;
      const [session, user, assignment] = await Promise.all([
        this.sessionsRepository.findOne({ _id: sessionId }).lean(),
        this.userRepository.findOne({ _id: userId }).lean(),
        this.userAssignmentsService.get({ userId, sessionId }),
      ]);
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
      const upd = await this.userAssignmentsService.update(
        { _id: assignment && assignment[0]?._id },
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
            status: "inprogress",
            startedAt: Date.now().toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            }),
          }
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async skipQuestion(args) {
    try {
      const { userId, sessionId } = args;
      const user = await this.userRepository.findOnelean({ _id: userId });
      if (!user?.skips) return { error: "No Skips Available" };
      const [assignment, session] = await Promise.all([
        this.userAssignmentsService.get({
          userId,
          sessionId,
        }),
        this.sessionsRepository.findOnelean({ _id: sessionId }),
      ]);
      const ifAlreadyExists = await this.userAssignmentsService.get({
        userId,
        sessionId: session?.nextQuestion,
      });
      if (ifAlreadyExists?.length) return { error: "Already Skipped" };
      const nextSession = await this.sessionsRepository.findOnelean({
        _id: session?.nextQuestion,
      });
      if (!assignment?.length || assignment[0]?.status !== "inprogress")
        return { error: "Forbidden" };
      if (session.type === "interview")
        return { error: "Interview Cannot Be Skipped" };
      await Promise.all([
        this.userAssignmentsService.create({
          lessonId: nextSession.lessonId,
          sessionId: nextSession._id,
          userId,
        }),
        this.userRepository.updateOne(
          { _id: userId },
          { $set: { skips: user.skips - 1 } }
        ),
      ]);
      return { error: "Skipped Successfully" };
    } catch (error) {
      throw error;
    }
  }
};
