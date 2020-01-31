const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  image: Buffer
});

module.exports = mongoose.model("photo", photoSchema);
