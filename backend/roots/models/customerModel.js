const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  street: String,
  city: String,
  zipCode: String,
  country: String
});

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: [String],
  addresses: [AddressSchema]
});

module.exports = mongoose.model('Customer', CustomerSchema);
