const sessionsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const SessionsController = require("../controllers/SessionsController");

sessionsRouter.post("/v1/sessions/submitQuestion", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.submitQuestion(req);
});

sessionsRouter.post("/v1/sessions/startQuestion", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.startQuestion(req);
});

sessionsRouter.post("/v1/sessions/skipQuestion", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.skipQuestion(req);
});

sessionsRouter.post("/v1/sessions/createSession", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.createSession(req);
});

sessionsRouter.post("/v1/sessions/updateSession", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.updateSession(req);
});

sessionsRouter.post("/v1/sessions/getSession", async (req, res) => {
  const sessionsControllerPromise = new SessionsController(res);
  sessionsControllerPromise.getSession(req);
});

module.exports = sessionsRouter;
