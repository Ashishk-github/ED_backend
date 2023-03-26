const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const app = express();
const cors = require("cors");
const verifyToken = require("./controllers/auth");
const mongoose = require("mongoose");
const { config } = require("./config/config");

app.use(cors());
app.use(bodyParser.json());
app.get("/health", (req, res) => {
  res.json({ message: "Fine" });
});

app.use("/execution", [verifyToken], router.executionRouter);
app.use("/user", router.userRouter);
app.use("/courses", [verifyToken], router.coursesRouter);
app.use("/sessions", [verifyToken], router.sessionsRouter);
app.use("/lessons", [verifyToken], router.lessonsRouter);
console.log("url-->", process.env.DB_URL);
mongoose.connect(config.app.db_url).then((start) => {
  console.log("connected to -->mongodb://127.0.0.1:27017/main");
  app.listen(4000, () => {
    console.log("started on 4000");
  });
});
