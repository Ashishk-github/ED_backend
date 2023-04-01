const UserRepository = require("../repository/UserRepository");
const SessionsRepository = require("../repository/SessionsRepository");
const UserAssignmentsRepository = require("../repository/UserAssignmentsRepository");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const { encrypt, decrypt } = require("../utils/common");

module.exports = class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.userAssignmentsRepository = new UserAssignmentsRepository();
    this.sessionsRepository = new SessionsRepository();
  }

  async login(args) {
    try {
      let { username, password } = args;
      const user = await this.userRepository.findOne({ email: username });
      if (!user) return { error: "Invalid username" };
      else {
        user.password = decrypt(user.password);
        if (user.password === password) {
          const token = jwt.sign(
            { userId: String(user.id) },
            config.app.app_key
          );
          return { jwt: token, user };
        } else return { error: "Incorrect Password" };
      }
    } catch (error) {
      throw error;
    }
  }

  async register(args) {
    try {
      let { name, email, mobile, yearOfGraduation, password, university } =
        args;
      const existingUser = await this.userRepository.findOne({
        $or: [{ email }, { mobile }],
      });
      if (existingUser) return { error: "User already exists!!" };
      const session = await this.sessionsRepository.findOne({});
      password = encrypt(password);
      const [user] = await this.userRepository.create([
        {
          name,
          email,
          mobile,
          yearOfGraduation,
          password,
          university,
          courses: {
            currentQuestion: {
              id: String(session._id),
              lessonId: String(session.lessonId),
              startedAt: new Date(),
            },
          },
        },
      ]);
      await this.userAssignmentsRepository.create({
        userId: user._id,
        lessonId: session.lessonId,
        sessionId: session._id,
        courseId: session.courseId,
      });
      const token = jwt.sign({ userId: String(user.id) }, config.app.app_key);
      return { message: "created successfully", user: user, jwt: token };
    } catch (error) {
      throw error;
    }
  }

  async subscribe(args) {
    try {
      if (args?.secretKey === config.api_key)
        await this.userRepository.updateOne(
          { _id: args.userId },
          { $set: { isSubscribed: true, skips: 6 } }
        );
      return { message: "Success" };
    } catch (error) {
      throw error;
    }
  }
};
