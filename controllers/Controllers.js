module.exports = class Controller {
  constructor(res) {
    this.res = res;
  }

  respond(args) {
    this.res.json(args);
  }

  sendError(err) {
    console.log(err);
    this.res.status(500).json({ error: "something went wrong" });
  }
};
