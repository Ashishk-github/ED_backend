const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    rating: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: "unlocked",
    },
    isSkip: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    startedAt: {
      type: String,
      default: () =>
        Date.now().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    },
    endedAt: {
      type: String,
    },
    isOnTime: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const userassignments = mongoose.model("userassignments", Schema);

module.exports = userassignments;
