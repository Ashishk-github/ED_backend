const Controller = require("./Controllers");
const CoursesService = require("../services/CoursesService");

module.exports = class CoursesController extends Controller {
  constructor(res) {
    super(res);
    this.coursesService = new CoursesService();
  }

  async getAll(req) {
    try {
      const coursesServiceResponse = await this.coursesService.getAll(
        req.query
      );
      this.respond(coursesServiceResponse);
    } catch (error) {
      console.log(error);
      this.respond(error);
    }
  }

  async all(req) {
    try {
      const coursesServiceResponse = await this.coursesService.all2(req.query);
      this.respond(coursesServiceResponse);
    } catch (error) {
      console.log(error);
      this.respond(error);
    }
  }
};
