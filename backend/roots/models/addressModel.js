const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  streetName:{type:String},
  streetNumber:{type:String},

  city: {type:String,default:"tel aviv"},
  country:{type:String,default:"Israel"},
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;


