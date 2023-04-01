const Controller = require("./Controllers");
const ClassesService = require("../services/ClassesService");

module.exports = class CoursesController extends Controller {
  constructor(res) {
    super(res);
    this.classesService = new ClassesService();
  }

  async get(req) {
    try {
      const serviceResponse = await this.classesService.get();
      this.respond(serviceResponse);
    } catch (error) {
      console.log(error);
      this.respond(error);
    }
  }
};
