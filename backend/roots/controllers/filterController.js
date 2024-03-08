const searchAlgorithm = require("../../backEndUtils/searchBackend");
const Dictionary = require("../models/dictionaryModel");
const Dish = require("../models/dishModel");
const MenuCategory = require("../models/menuCategoryModel");
const Menu = require("../models/menuModel");
const Restaurant = require("../models/restaurantModel");

exports.TheGreatFilter = async (req, res) => {
  try {
    const dictionary=await Dictionary.find({})
    const { restaurants, dishes } = searchAlgorithm(req.params.searched,dictionary[0]);
    const populatedDishes = [];
    const populatedRestaurants = [];
    for (const dish of dishes) {
      const populatedDish = await Dish.findById(dish.dishId);
      console.log("🚀 ~ exports.TheGreatFilter= ~ dish.dishId:", dish.dishId)
      populatedDishes.push(populatedDish);
    }
    
    if (restaurants.length===0){
      for (const dish of populatedDishes) {
  const menuCategory = await MenuCategory.findById(dish.menuCategory);
  const menu= await Menu.findById(menuCategory.menu)
  const populatedRestaurant= await Restaurant.findById(menu)
  populatedRestaurants.push(populatedRestaurant);

    }

    }
    for (const restaurant of restaurants) {
      const populatedRestaurant = await Restaurant.findById(restaurant.restaurantId);
      populatedRestaurants.push(populatedRestaurant);
    }

    res
      .status(200)
      .send({
        Message: "success",
        dishes: populatedDishes,
        restaurants: populatedRestaurants,
      });
  } catch (error) {
    res.status(500).send({ Message: "fail" });
  }
};

