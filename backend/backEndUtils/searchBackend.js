const Fuse = require("fuse.js");
const axios = require("axios");
const Dictionary = require("../roots/models/dictionaryModel");
const fuseOptions = {
  shouldSort: true,
  keys: ["name"],
};


const searchAlgorithm = async (input) => {
  const dictionary = await Dictionary.find({});
  const { restaurant, dishes } = dictionary[0];
  const fuseRestaurant = new Fuse(restaurant, fuseOptions);
  const fuseDishes = new Fuse(dishes, fuseOptions);
  const restaurantAnswer = fuseRestaurant
    .search(input)
    .slice(0, 5)
    .map((res) => res.item);
  const dishAnswer = fuseDishes
    .search(input)
    .slice(0, 30)
    .map((dish) => dish.item);
    const dishesIds = dishAnswer.map((dish) => dish.dishId);
    const restaurantIds = restaurantAnswer.map(
      (restaurant) => restaurant.restaurantId
    );
  return { dishes: dishesIds, restaurants: restaurantIds };

};

module.exports = searchAlgorithm;
