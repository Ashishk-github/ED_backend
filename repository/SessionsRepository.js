const sessions = require("../models/Sessions");

module.exports = class SessionsRepository {
  find(args) {
    return sessions.find(args);
  }

  findOne(args) {
    return sessions.findOne(args);
  }

  findOnelean(args) {
    return sessions.findOne(args).lean();
  }

  create(args) {
    return sessions.insertMany(args);
  }
};
