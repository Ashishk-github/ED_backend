const router = require("express").Router();
const Controller = require("../controllers/UserAssignmentsController");

router.post("/v1/user/login", (req, res) => {
  const ControllerPromise = new Controller(res);
  ControllerPromise.login(req);
});

module.exports = router;
