const router = require("express").Router();
const Controller = require("../controllers/ClassesController");

router.get("/v1/classes/get", (req, res) => {
  const ControllerPromise = new Controller(res);
  ControllerPromise.get(req);
});

module.exports = router;
