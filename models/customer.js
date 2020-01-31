const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  age: Number,
  address: {
    city: String,
    country: String
  },
  male: Boolean
});

module.exports = mongoose.model("customer", customerSchema);
