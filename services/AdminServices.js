const UserRepository = require("../repository/UserRepository");
const SessionsRepository = require("../repository/SessionsRepository");
const UserAssignmentsRepository = require("../repository/UserAssignmentsRepository");
const SessionsService = require("../services/SessionsService");
const { default: mongoose } = require("mongoose");
const { encrypt, decrypt } = require("../utils/common");

module.exports = class AdminService {
  constructor() {
    this.userRepository = new UserRepository();
    this.userAssignmentsRepository = new UserAssignmentsRepository();
    this.sessionsRepository = new SessionsRepository();
    this.sessionsService = new SessionsService();
  }

  async getUsers() {
    try {
      return await this.userRepository.find({}).lean();
    } catch (error) {
      throw error;
    }
  }

  async getUserAssignments(args) {
    try {
      const { studentId: userId } = args;
      return await this.userAssignmentsRepository.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(userId) },
        },
        {
          $lookup: {
            from: "sessions",
            localField: "sessionId",
            foreignField: "_id",
            as: "sessions",
          },
        },
        {
          $project: {
            name: { $arrayElemAt: ["$sessions.name", 0] },
            type: { $arrayElemAt: ["$sessions.type", 0] },
            status: 1,
            _id: "$sessionId",
            lessonId: 1,
            rating: 1,
          },
        },
      ]);
    } catch (error) {
      throw error;
    }
  }

  async reassign(args) {
    try {
      const { studentId: userId, sessionId, update } = args;
      const assign = await this.userAssignmentsRepository.updateOne(
        { userId, sessionId },
        { $set: update }
      );
      return assign;
    } catch (error) {
      throw error;
    }
  }

  async completeInterview(args) {
    try {
      const { studentId: userId, sessionId, remark } = args;
      return await this.sessionsService.submitQuestion({
        sessionId,
        userId,
        answer: "Mentors Review:" + remark || "No Remarks",
        isMentor: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(args) {
    try {
      let {
        skips,
        email,
        mobile,
        name,
        password,
        univerity,
        yearOfGraduation,
        _id,
      } = args;
      const obj = {};
      if (password?.length) obj["password"] = encrypt(password);
      if (skips || 0 == parseInt(skips)) obj["skips"] = skips;
      if (email?.length) obj["email"] = email;
      if (mobile?.length) obj["mobile"] = mobile;
      if (name?.length) obj["name"] = name;
      if (univerity?.length) obj["univerity"] = univerity;
      if (yearOfGraduation?.length) obj["yearOfGraduation"] = yearOfGraduation;
      const user = await this.userRepository.updateOne({ _id }, { $set: obj });
      return user;
    } catch (error) {
      throw error;
    }
  }
};
