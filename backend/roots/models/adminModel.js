const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  wiatin: String,
  city: String,
  zipCode: String,
  country: String,
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
