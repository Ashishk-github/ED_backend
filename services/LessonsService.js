const LessonsRepository = require("../repository/LessonsRepository");
const SessionsRepository = require("../repository/SessionsRepository");
const UserRepository = require("../repository/UserRepository");
const UserAssignmentsService = require("../services/UserAssignmentsService");
const jwt = require("jsonwebtoken");

module.exports = class LessonsService {
  constructor() {
    this.lessonsRepository = new LessonsRepository();
    this.sessionsRepository = new SessionsRepository();
    this.userRepository = new UserRepository();
    this.userAssignmentsService = new UserAssignmentsService();
  }

  async getAll(args) {
    try {
      const { userId, lessonId } = args;
      const lesson = await this.lessonsRepository
        .findOne({ _id: lessonId })
        .lean();
      if (!lesson) return { error: "Invalid lessonId" };
      lesson.sessions = [];
      const [sessions, assignments] = await Promise.all([
        this.sessionsRepository
          .find({ lessonId: lesson._id })
          .sort({ sorting: 1 })
          .lean(),
        this.userAssignmentsService.get({ userId, lessonId }),
      ]);

      sessions.forEach((session) => {
        let assignment = assignments.find((a) => {
          return String(a.sessionId) === String(session._id);
        });
        let status = assignment?.status ? assignment.status : "locked";
        lesson.sessions.push({
          ...session,
          startedAt: assignment?.startedAt,
          endedAt: assignment?.endedAt,
          status,
        });
      });
      return lesson;
    } catch (error) {
      throw error;
    }
  }
};
