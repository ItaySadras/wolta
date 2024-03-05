const mongoose = require("mongoose");
const menuCategorySchema = new mongoose.Schema({
  menuCategoryName: { type: String },
  menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

const MenuCategory = mongoose.model("MenuCategory", menuCategorySchema);

module.exports = MenuCategory;
