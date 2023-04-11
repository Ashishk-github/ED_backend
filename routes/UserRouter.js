const userRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const UserController = require("../controllers/UserController");
const verifyToken = require("../controllers/auth");

userRouter.post("/v1/user/login", async (req, res) => {
  const userControllerPromise = new UserController(res);
  userControllerPromise.login(req);
});

userRouter.post("/v1/user/register", async (req, res) => {
  const userControllerPromise = new UserController(res);
  userControllerPromise.register(req);
});

userRouter.post("/v1/user/subscribe", async (req, res) => {
  const userControllerPromise = new UserController(res);
  userControllerPromise.subscribe(req);
});

userRouter.get("/v1/user/get", [verifyToken], async (req, res) => {
  const userControllerPromise = new UserController(res);
  userControllerPromise.get(req);
});

module.exports = userRouter;
