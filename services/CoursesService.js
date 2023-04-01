const CoursesRepository = require("../repository/CoursesRepository");
const LessonsRepository = require("../repository/LessonsRepository");
const UserRepository = require("../repository/UserRepository");
const UserAssignmentsService = require("../services/UserAssignmentsService");
module.exports = class CoursesService {
  constructor() {
    this.coursesRepository = new CoursesRepository();
    this.lessonsRepository = new LessonsRepository();
    this.userRepository = new UserRepository();
    this.userAssignmentsService = new UserAssignmentsService();
  }

  async getAll(args) {
    try {
      let courses = await this.coursesRepository.find().lean();
      let lessons = await this.lessonsRepository.find().lean();
      let user = await this.userRepository.findOne({ _id: args.userId });
      const result = [];
      let c = {};
      courses.forEach((course) => {
        c[String(course._id)] = [];
      });
      let status = "completed";
      lessons.forEach((lesson) => {
        if (user?.courses?.currentQuestion?.lessonId === String(lesson._id))
          status = "inprogress";
        else if (status == "inprogress") status = "locked";
        lesson = { ...lesson, status };
        c[String(lesson.courseId)]?.push(lesson);
      });
      courses.forEach((course) => {
        course = { ...course, lessons: c[String(course._id)] };
        result.push(course);
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async all2(args) {
    try {
      const { userId } = args,
        course = {};
      const assignments = this.userAssignmentsService.get({ userId });
      let courses = this.coursesRepository.find().lean();
      let lessons = this.lessonsRepository.find().sort({ sorting: 1 }).lean();
      const result = await Promise.all([assignments, courses, lessons]);
      result[1].forEach((c) => {
        course[String(c._id)] = { ...c, lessons: [] };
      });
      result[2].forEach((lesson) => {
        let status = result[0].find(
          (a) => a.lessonId === String(lesson._id)
        )[0];
        status = status?.status ? status.status : "locked";
        course[String(lesson.courseId)].lessons.push({ ...lesson, status });
      });
      return Object.values(course);
    } catch (error) {
      throw error;
    }
  }
};
