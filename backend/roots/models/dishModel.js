const mongoose = require("mongoose");
const dishSchema = new mongoose.Schema({
  dishName: { type: String },
  menuCategory: { type: mongoose.Schema.Types.ObjectId, ref: "MenuCategory" },
  ingredients: [{ type: String }],
  image: { type: String },
  intolerances: [{ type: String }],
  price: { type: Number },
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;
