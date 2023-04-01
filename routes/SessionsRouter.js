const sessionsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const SessionsController = require("../controllers/SessionsController");

sessionsRouter.post("/v1/sessions/submitQuestion", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.submitQuestion(req);
});

sessionsRouter.post("/v1/sessions/startQuestion", async (req, res) => {
  console.log("in");
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.startQuestion(req);
});

sessionsRouter.post("/v1/sessions/skipQuestion", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.skipQuestion(req);
});

module.exports = sessionsRouter;
