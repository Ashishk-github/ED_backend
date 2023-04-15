const adminRouter = require("express").Router();
const AdminController = require("../controllers/AdminController");

adminRouter.get("/v1/admin/getUsers", async (req, res) => {
  const adminControllerPromise = new AdminController(res);
  adminControllerPromise.getUsers(req);
});

adminRouter.get("/v1/admin/getUserAssignments", async (req, res) => {
  const adminControllerPromise = new AdminController(res);
  adminControllerPromise.getUserAssignments(req);
});

adminRouter.get("/v1/admin/completeInterview", async (req, res) => {
  const adminControllerPromise = new AdminController(res);
  adminControllerPromise.completeInterview(req);
});

adminRouter.post("/v1/admin/reassign", async (req, res) => {
  const adminControllerPromise = new AdminController(res);
  adminControllerPromise.reassign(req);
});

module.exports = adminRouter;
