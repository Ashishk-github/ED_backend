const router = require("express").Router();
const Controller = require("../controllers/ClassesController");

router.post("/v1/user/login", (req, res) => {
  const ControllerPromise = new Controller(res);
  ControllerPromise.login(req);
});

router.post("/v1/user/register", (req, res) => {
  const ControllerPromise = new Controller(res);
  ControllerPromise.register(req);
});

module.exports = router;
