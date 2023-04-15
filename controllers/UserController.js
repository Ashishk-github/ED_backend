const Controller = require("./Controllers");
const UserService = require("../services/UserServices");

module.exports = class UserController extends Controller {
  constructor(res) {
    super(res);
    this.userService = new UserService();
  }

  async login(req, res) {
    try {
      const userServiceResponse = await this.userService.login(req.body);
      this.respond(userServiceResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async register(req, res) {
    try {
      const userServiceResponse = await this.userService.register(req.body);
      this.respond(userServiceResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async subscribe(req) {
    try {
      const userServiceResponse = await this.userService.subscribe(req.body);
      this.respond(userServiceResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async get(req) {
    try {
      const userServiceResponse = await this.userService.getUserDetails(
        req.body
      );
      this.respond(userServiceResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async loginAdmin(req) {
    try {
      const userServiceResponse = await this.userService.loginAdmin(req.body);
      this.respond(userServiceResponse);
    } catch (error) {
      console.log(error);
    }
  }
};
