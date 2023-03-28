const model = require("../models/Classes");

module.exports = class ClassesRepository {
  find(args) {
    return model.find(args);
  }

  findOne(args) {
    return model.findOne(args);
  }

  create(args) {
    return model.insertMany(args);
  }

  updateMany(cond, args) {
    return model.updateMany(cond, args);
  }

  updateOne(cond, args) {
    return model.updateOne(cond, args);
  }
};
