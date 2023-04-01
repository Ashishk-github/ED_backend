const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name:{
      type:String
    },
    date:{
      type:Date
    },
    link:{
      type:String
    },
    mentor:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("classes", Schema);

module.exports = model;
