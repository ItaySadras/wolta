const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({

Restaurant:{ type: mongoose.Schema.Types.ObjectId,ref:"Restaurant" },
menuCategories:[{ type: mongoose.Schema.Types.ObjectId,ref:"MenuCategory" }],
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;




