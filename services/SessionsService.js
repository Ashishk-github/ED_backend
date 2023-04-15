const SessionsRepository = require("../repository/SessionsRepository");
const LessonsRepository = require("../repository/LessonsRepository");
const UserRepository = require("../repository/UserRepository");
const UserAssignmentsService = require("../services/UserAssignmentsService");
const NotesService = require("../services/NotesService");
const jwt = require("jsonwebtoken");

module.exports = class SessionsService {
  constructor() {
    this.sessionsRepository = new SessionsRepository();
    this.lessonsRepository = new LessonsRepository();
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
      if (!user) return { error: "Invalid User" };
      const note = {
        userAssignmentId: assignment && assignment[0]?._id,
        answer,
        userId,
      };
      if (session?.type === "interview" && !args?.isMentor)
        return { error: "Interview has to be submited by mentor" };
      const nextSession = await this.sessionsRepository.findOne({
        _id: session.nextQuestion,
      });
      const submissionTime =
        parseInt(new Date(assignment[0]?.startedAt).getTime()) +
        parseInt(session?.time) * 60000 -
        parseInt(new Date().getTime());
      console.log(
        parseInt(new Date(assignment[0]?.startedAt).getTime()),
        parseInt(assignment[0]?.time),
        new Date().getTime(),
        submissionTime
      );
      const promises = [
        this.userAssignmentsService.create({
          lessonId: nextSession.lessonId,
          sessionId: nextSession._id,
          userId,
        }),
        this.notesService.create(note),
        this.userAssignmentsService.update(
          { _id: assignment && assignment[0]?._id },
          {
            endedAt: Date.now().toLocaleString("en-US", {
              timeZone: "Asia/Kolkata",
            }),
            answerId: note._id,
            status: "completed",
            isActive: false,
            isOnTime: submissionTime >= 0 ? true : false,
          }
        ),
      ];
      let update = {};
      if (assignment && assignment[0]?.isSkip) update["skips"] = user.skips + 1;
      if (submissionTime < 0) update["delaySubmit"] = user.delaySubmit || 0 + 1;
      if (Object.keys(update || {})?.length)
        promises.push(
          this.userRepository.updateOne({ _id: userId }, { $set: update })
        );
      await Promise.all(promises);
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
            startedAt: new Date().toLocaleString("en-US", {
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
      if (ifAlreadyExists?.length || session.isSkip)
        return { error: "Already Skipped" };
      const nextSession = await this.sessionsRepository.findOnelean({
        _id: session?.nextQuestion,
      });
      if (!assignment?.length || assignment[0]?.status !== "inprogress")
        return { error: "Forbidden" };
      if (session.type === "interview")
        return { error: "Interview Cannot Be Skipped" };
      await Promise.all([
        this.userAssignmentsService.update(
          {
            userId,
            sessionId: session._id,
          },
          { isSkip: true }
        ),
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
      return { message: "Skipped Successfully" };
    } catch (error) {
      throw error;
    }
  }

  async addSession(args) {
    try {
      const {
        client_id,
        client_secret,
        name,
        lessonName,
        description,
        nextQuestion,
        type,
        time,
        sorting,
        question,
        link,
        videoId,
      } = args;
      if (
        client_id !== process.var.app.client_id ||
        client_secret !== process.var.app.client_secret
      )
        return { error: "Invalid credentials" };
      const [lesson, existingSession] = await Promise.all([
        this.lessonsRepository.findOnelean({ name: lessonName }),
        this.sessionsRepository.findOnelean({ $or: [{ name }, { sorting }] }),
      ]);
      if (!lesson) return { error: "Invalid Lesson Name" };
      if (existingSession) return { error: "Name or sorting already exists" };
      const session = await this.sessionsRepository.create([
        {
          name,
          description,
          nextQuestion,
          type,
          sorting,
          question,
          link,
          videoId,
          lessonId: lesson._id,
          time,
        },
      ]);
      return { message: "Created successfully", session };
    } catch (error) {
      throw error;
    }
  }

  async updateSession(args) {
    try {
      const {
        client_id,
        client_secret,
        sessionName,
        newName,
        lessonName,
        description,
        nextQuestion,
        type,
        time,
        sorting,
        question,
        link,
        videoId,
      } = args;
      if (
        client_id !== process.var.app.client_id ||
        client_secret !== process.var.app.client_secret
      )
        return { error: "Invalid credentials" };
      await this.sessionsRepository.updateOne(
        { name: sessionName },
        {
          $set: {
            name: newName || sessionName,
            lessonName,
            description,
            nextQuestion,
            type,
            sorting,
            question,
            link,
            videoId,
            time,
          },
        }
      );
      return { message: "updated successfully" };
    } catch (error) {
      throw error;
    }
  }

  async get(args) {
    try {
      const { client_id, client_secret, sessionName, lessonName } = args;
      if (
        client_id !== process.var.app.client_id ||
        client_secret !== process.var.app.client_secret
      )
        return { error: "Invalid credentials" };
      if (sessionName)
        return await this.sessionsRepository.findOnelean({ name: sessionName });
      if (lessonName) {
        const lesson = await this.lessonsRepository.findOnelean({
          name: lessonName,
        });
        const sessions = await this.sessionsRepository.find({
          lessonId: lesson._id,
        });
        return { ...lesson, sessions };
      }
      return await this.sessionsRepository.find({});
    } catch (error) {
      throw error;
    }
  }
};
