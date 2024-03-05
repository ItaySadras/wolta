const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema({
  
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
