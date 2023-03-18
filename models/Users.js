const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: String,
    yearOfGraduation: String,
    university: String,
    email: String,
    mobile: String,
    password: String,
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    courses: {
      previousQuestion: Array,
      currentQuestion: {
        id: String,
        lessonId: String,
        startedAt: {
          type: Date,
          default: () => Date.now(),
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", UserSchema);

module.exports = Users;
