const ClassesRepository = require("../repository/ClassesRepository");
const jwt = require("jsonwebtoken");

module.exports = class LessonsService {
  constructor() {
    this.classesRepository = new ClassesRepository();
  }

  async get() {
    try {
      const classes = await this.classesRepository
        .find()
        .sort({ date: -1 })
        .limit(5);
      return classes;
    } catch (error) {
      throw error;
    }
  }
};
