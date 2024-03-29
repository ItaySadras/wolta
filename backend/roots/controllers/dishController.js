const { uploadToCloudinary, getRestaurantsWithDetails, getsADishRestaurant } = require("../../backEndUtils/helpers");
const { populate } = require("../models/customerModel");
const Dish = require("../models/dishModel");
const MenuCategory = require("../models/menuCategoryModel");
const Menu = require("../models/menuModel");
const Restaurant = require("../models/restaurantModel");

exports.createDish = async (req, res) => {
  try {
    let imgUrl;
    const { image, price, dishName } = req.body.dish;
    console.log("🚀 ~ exports.createDish= ~ image:", image)
    console.log("🚀 ~ exports.createDish= ~ dishName:", dishName)
    if (image) {
      imgUrl = await uploadToCloudinary(image, dishName);
      console.log("🚀 ~ exports.createDish= ~ imgUrl:", imgUrl)
      if (!imgUrl) {
        res.status(500).send({ message: "cant upload image" });
      }
    }
    const menuCategory = await MenuCategory.findById(req.params.menuCategoryId);
    const dish = await Dish.create({
      image: imgUrl,
      price: price,
      dishName: dishName,
      menuCategory: req.params.menuCategoryId,
    });
    menuCategory.dishes.push(dish._id);
    menuCategory.save();
    res.status(201).send({ message: "Dish created successfully", dish: dish });
  } catch (error) {
    console.log("🚀 ~ exports.createDish= ~ error:", error)
    res.status(404).send({
      status: "failed",
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
exports.delateDish = async (req, res) => {
  try {
    const deleteDish = await Dish.findByIdAndDelete(req.params.dishId);
    !deleteDish &&
      res.status(404).send({ message: "couldnt find/delete dish" });
    const menuCategory = await MenuCategory.findOne({
      dishes: { $in: [req.params.dishId] },
    });
    menuCategory.dishes = menuCategory.dishes.filter(
      (dish) => dish.toString() !== req.params.dishId
    );
    menuCategory.save();
    res.status(200).send({ message: "dish deleted sucssfully" });
    // delete from cloudnry
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "intarnel server error" });
  }
};

// exports.dishUpdater = async (req, res) => {
//   try {
//     const dish = await Dish.findById(req.params.dishId);
//     !dish && res.status(404).send({ message: "dish not find" });
//     const [key, value] = Object.entries(req.body)[0];
//     switch (key) {
//       case "ingredients" || "intolerances":
//         dish[key] = addToArrays(key, req.query.action, value, dish[key]);
//         break;

//       case "image":
//         res.status(500).send({ message: "this feature isnt ready yet" });
//         break;

//       case "dishName" || "price":
//         dish[key] = value;
//         break;

//       default:
//         res.status(404).send({ message: `dish have no key keyd ${key}` });
//         break;
//     }
//     await dish.save();
//     res.status(200).send({ message: "sucsses", updatedDish: dish });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };


exports.dishUpdater = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.dishId, req.body);
    !dish && res.status(404).send({ message: "dish not found" });
    console.log(dish);
    res.status(200).send({ message: "success", updatedDish: dish });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addToArrays = (key, action, data, currentValue) => {
  switch (action) {
    case "add":
      if (currentValue.some((item) => item === data)) {
        return currentValue;
      }
      return [...currentValue, data];
    case "remove":
      return currentValue.filter((item) => item != data);

    default:
      return error;
  }
};

exports.getDishRestaurant = async (req, res) => {
  try {
    const restaurant = await getsADishRestaurant(req.params.dishId)
    res.status(200).send({ restaurant: restaurant[0] });

  } catch (error) {
    console.log("🚀 ~ exports.getDishRestaurant= ~ error:", error);
    res.status(500).send({ message: "intarnel server error" });
  }
};
