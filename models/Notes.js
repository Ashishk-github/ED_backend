const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    userAssignmentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    answer: {
      type: Object,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", Schema);

module.exports = Notes;
