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
    skips: {
      type: Number,
      default: 0,
    },
    delaySubmit: {
      type: Number,
      default: 0,
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
