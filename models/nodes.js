const mongoose = require("mongoose");

const nodeSchema = new mongoose.Schema({
  _id: Number,
  object: String
});

module.exports = mongoose.model("node", nodeSchema);
