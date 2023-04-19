const Controller = require("./Controllers");
const AdminService = require("../services/AdminServices");
const UserRepository = require("../repository/UserRepository");

module.exports = class AdminController extends Controller {
  constructor(res) {
    super(res);
    this.adminService = new AdminService();
    this.userRepository = new UserRepository();
  }

  async checkAdmin(req) {
    try {
      const admin = await this.userRepository.findOnelean({
        _id: req.body.userId,
      });
      // console.log(admin);
      if (admin?.isAdmin) return;
      else throw "Invalid user";
    } catch (error) {
      throw error;
    }
  }

  async getUsers(req, res) {
    try {
      await this.checkAdmin(req);
      const adminServiceResponse = await this.adminService.getUsers(req.query);
      this.respond(adminServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async getUserAssignments(req, res) {
    try {
      await this.checkAdmin(req);
      const adminServiceResponse = await this.adminService.getUserAssignments(
        req.query
      );
      this.respond(adminServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async reassign(req, res) {
    try {
      await this.checkAdmin(req);
      const adminServiceResponse = await this.adminService.reassign(req.body);
      this.respond(adminServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async completeInterview(req, res) {
    try {
      await this.checkAdmin(req);
      const adminServiceResponse = await this.adminService.completeInterview(
        req.query
      );
      this.respond(adminServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }

  async updateUser(req, res) {
    try {
      await this.checkAdmin(req);
      const adminServiceResponse = await this.adminService.updateUser(req.body);
      this.respond(adminServiceResponse);
    } catch (error) {
      this.sendError(error);
    }
  }
};
