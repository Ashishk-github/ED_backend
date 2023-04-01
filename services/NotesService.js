const LessonsRepository = require("../repository/LessonsRepository");
const SessionsRepository = require("../repository/SessionsRepository");
const UserRepository = require("../repository/UserRepository");
const NotesRepository = require("../repository/NotesRepository");
const jwt = require("jsonwebtoken");

module.exports = class NotesService {
  constructor() {
    this.lessonsRepository = new LessonsRepository();
    this.sessionsRepository = new SessionsRepository();
    this.notesRepository = new NotesRepository();
    this.userRepository = new UserRepository();
  }

  async getAll(args) {
    try {
      const notes = await this.notesRepository.find(args);
      return notes;
    } catch (error) {
      throw error;
    }
  }

  async create(args) {
    try {
      const notes = await this.notesRepository.create(args);
      return notes;
    } catch (error) {
      throw error;
    }
  }
};
