const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  streetNumber:{type:String},
  city: {type:String},
  streetNumber: {type:String},
  country:{type:String,default:"Israel"},
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;


