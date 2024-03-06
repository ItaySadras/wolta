const mongoose = require("mongoose");



const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: [{type: String}],
  addresses: [{type: mongoose.Schema.Types.ObjectId,ref:"Address"}],
});

const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;
