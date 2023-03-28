const mongoose = require("mongoose");

const SessionsSchema = mongoose.Schema({
  name: String,
  question: String,
  description: String,
  lessonId: mongoose.Schema.Types.ObjectId,
  type: String,
  sorting: String,
  nextQuestion: mongoose.Schema.Types.ObjectId,
});

const Sessions = mongoose.model("sessions", SessionsSchema);

module.exports = Sessions;
