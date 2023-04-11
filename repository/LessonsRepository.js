const lessons = require("../models/Lessons");

module.exports = class LessonsRepository {
  find(args) {
    return lessons.find(args);
  }

  findOne(args) {
    return lessons.findOne(args);
  }

  findOnelean(args) {
    return lessons.findOne(args).lean();
  }

  create(args) {
    return lessons.insertMany(args);
  }
};
