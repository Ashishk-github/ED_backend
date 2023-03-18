const UserRepository = require("../repository/UserRepository");
const SessionsRepository = require("../repository/SessionsRepository");
const jwt = require("jsonwebtoken");

module.exports = class UserService {
  constructor() {
    this.userRepository = new UserRepository();
    this.sessionsRepository = new SessionsRepository();
  }

  async login(args) {
    try {
      const { username, password } = args;
      console.log(username);
      const user = await this.userRepository.findOne({ email: username });
      if (!user) return { error: "Invalid username" };
      else {
        if (user.password === password) {
          const token = jwt.sign(
            { userId: String(user.id) },
            "xube8c93e9ebx8bec99--r2g7---ce8bw8xb8becyrvcbehbuebx"
          );
          return { jwt: token };
        } else return { error: "Incorrect Password" };
      }
    } catch (error) {
      throw error;
    }
  }

  async register(args) {
    try {
      const { name, email, mobile, yearOfGraduation, password, university } =
        args;
      const existingUser = await this.userRepository.findOne({
        $or: [{ email }, { mobile }],
      });
      if (existingUser) return { error: "User already exists!!" };
      const session = await this.sessionsRepository.findOne({});
      console.log(
        "sess->",
        session,
        String(session._id),
        String(session.lessonId)
      );
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
      const token = jwt.sign(
        { userId: String(user.id) },
        "xube8c93e9ebx8bec99--r2g7---ce8bw8xb8becyrvcbehbuebx"
      );
      return { message: "created successfully", id: user.id, jwt: token };
    } catch (error) {
      throw error;
    }
  }
};
