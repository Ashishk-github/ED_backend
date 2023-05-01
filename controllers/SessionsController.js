const Controller = require("./Controllers");
const SessionsService = require("../services/SessionsService");

module.exports = class SessionsController extends Controller {
  constructor(res) {
    super(res);
    this.sessionsService = new SessionsService();
  }

  async submitQuestion(req) {
    try {
      const sessionsServiceResponse = await this.sessionsService.submitQuestion(
        req.body
      );
      this.respond(sessionsServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async startQuestion(req) {
    try {
      const sessionsServiceResponse = await this.sessionsService.startQuestion(
        req.body
      );
      this.respond(sessionsServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async skipQuestion(req) {
    try {
      const sessionsServiceResponse = await this.sessionsService.skipQuestion(
        req.body
      );
      this.respond(sessionsServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async createSession(req) {
    try {
      const sessionsServiceResponse = await this.sessionsService.addSession(
        req.body
      );
      this.respond(sessionsServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async updateSession(req) {
    try {
      const sessionsServiceResponse = await this.sessionsService.updateSession(
        req.body
      );
      this.respond(sessionsServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async getSession(req) {
    try {
      const sessionsServiceResponse = await this.sessionsService.get(req.body);
      this.respond(sessionsServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async get(req) {
    try {
      const sessionsServiceResponse = await this.sessionsService.getById(
        req.query
      );
      this.respond(sessionsServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }
};
