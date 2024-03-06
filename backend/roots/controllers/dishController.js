const Dish = require("../models/dishModel");
const MenuCategory = require("../models/menuCategoryModel");

exports.createDish = async (req, res) => {
  try {
    const menuCategory = await MenuCategory.findById(req.params.menuCategoryId);
    const dish = await Dish.create({
      ...req.body.dish,
      menuCategory: req.params.menuCategoryId,
    });
    menuCategory.dishes.push(dish._id);
    menuCategory.save();
    res.status(201).json({ message: "Dish created successfully", dish: dish });
  } catch (error) {
    res.status(404).json({
      status: failed,
      message: error.message,
    });
  }
};

exports.getDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json({ message: "Dish found", dish: dish });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
