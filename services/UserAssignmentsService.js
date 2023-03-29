const LessonsRepository = require("../repository/LessonsRepository");
const SessionsRepository = require("../repository/SessionsRepository");
const UserRepository = require("../repository/UserRepository");
const UserAssignmentsRepository = require("../repository/UserAssignmentsRepository");
const jwt = require("jsonwebtoken");

module.exports = class LessonsService {
  constructor() {
    this.lessonsRepository = new LessonsRepository();
    this.sessionsRepository = new SessionsRepository();
    this.userAssignmentsRepository = new UserAssignmentsRepository();
    this.userRepository = new UserRepository();
  }

  async get(args) {
    try {
      const assignments = await this.userAssignmentsRepository
        .find(args)
        .lean();
      return assignments;
    } catch (error) {
      throw error;
    }
  }

  async create(args) {
    try {
      const check = await this.userAssignmentsRepository.findOne(args);
      if (!check) await this.userAssignmentsRepository.create(args);
      return { message: "done" };
    } catch (error) {
      throw error;
    }
  }

  async update(cond, args) {
    try {
      const assignment = await this.userAssignmentsRepository.updateMany(cond, {
        $set: args,
      });
      return assignment;
    } catch (error) {
      throw error;
    }
  }
};
