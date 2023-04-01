const executionRouter = require("express").Router();

executionRouter.get("/v1/scripts/run", (req, res) => {
  res.json({ message: "success" });
});

module.exports = executionRouter;
