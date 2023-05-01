const model = require("../models/Notes");

module.exports = class NotesRepository {
  find(args) {
    return model.find(args);
  }

  findOne(args) {
    return model.findOne(args);
  }

  findOneLean(args) {
    return model.findOne(args).lean();
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

  upsert(cond, args) {
    return model.findOneAndUpdate(cond, args, { upsert: true });
  }
};
