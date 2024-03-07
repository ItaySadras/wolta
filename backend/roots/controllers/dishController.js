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

exports.getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({});
    if (!dishes) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json({ message: "Dish found", dishes: dishes });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.delateDish=async (req,res)=>{
    try {
        const deleteDish= await Dish.findByIdAndDelete(req.params.dishId)
        !deleteDish&&res.status(404).send({message:"couldnt find/delete dish"})
        const menuCategory=await MenuCategory.findOne({dishes:{$in: [req.params.dishId]}})
        menuCategory.dishes=menuCategory.dishes.filter(dish=>dish.toString()!==req.params.dishId)
        menuCategory.save()
        res.status(200).send({message:"dish deleted sucssfully"})
        // delete from cloudnry
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"intarnel server error"})
    }
}