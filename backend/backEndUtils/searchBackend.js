const Fuse = require("fuse.js");
const axios = require("axios");

const fuseOptions = {
  shouldSort: true,
  keys: ["name"],
};

const searchAlgorithm = (input, dictionary) => {
  const { restaurant, dishes } = dictionary;
  const fuseRestaurant = new Fuse(restaurant, fuseOptions);
  const fuseDishes = new Fuse(dishes, fuseOptions);
  const restaurantAnswer = fuseRestaurant.search(input).slice(0, 20).map(res=>res.item);;
  const dishAnswer = fuseDishes.search(input).slice(0, 20).map(dish=>dish.item);
  console.log("🚀 ~ searchAlgorithm ~ { dishes: dishAnswer, restaurants: restaurantAnswer };:", { dishes: dishAnswer, restaurants: restaurantAnswer })
  return { dishes: dishAnswer, restaurants: restaurantAnswer };
};

module.exports = searchAlgorithm;
