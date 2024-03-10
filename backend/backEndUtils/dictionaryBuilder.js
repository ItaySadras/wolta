// const axios = require("axios");
// const Dictionary = require("../roots/models/dictonaryModel");

// const dictionaryDishBuilder = async () => {
//   const response = await axios.get(
//     "http://localhost:8000/api/dish/getAllDishes"
//   );
//   const dishes = response.data.dishes;
//   createdDishes = [];
//   for (const dish of dishes) {
//     createdDishes.push({ name: dish.dishName, type: "dish", dishId: dish });
//   }

//   const response2 = await axios.get(
//     "http://localhost:8000/api/restaurant/getAllRestaurant"
//   );
//   const dictionaryRes = [];
//   const restaurants = response2.data.restaurants;
//   for (const restaurant of restaurants) {
//     dictionaryRes.push({ name: restaurant.restaurantName, type: "restaurant", restaurantId:restaurant});
//   }
//   const dictionary = await Dictionary.create({
//     dishes: createdDishes,
//     restaurant: dictionaryRes,
//   });
// };

// // const dictionaryRestaurantsBuilder = async () => {
// //   const response = await axios.get(
// //     "http://localhost:8000/api/restaurant/getAllRestaurant"
// //   );
// //   const dictionaryRes = [];
// //   const restaurants = response.data.restaurants;
// //   const dictionary = await Dictionary.findById("65e8d29871db354aa131493d");
// //   for (const restaurant of restaurants) {
// //     dictionary.items.push({ name: restaurant.restaurantName, type: "restaurant" });
// //   }
// // //   await dictionary.save()
// // // };
// // const dictionaryFilterBuilder = async () => {
// //   const filters = [
// //     "Chinese",
// //     "France",
// //     "Hamburger",
// //     "Greek",
// //     "Italian",
// //     "Mexican",
// //     "Indian",
// //     "Japanese",
// //     "Thai",
// //     "Mediterranean",
// //     "kosher",
// //     "gluten-free",
// //     "dairy-free",
// //   ];
// //   const dictionary = await Dictionary.findById("65e8d29871db354aa131493d");
// //   for (const filter of filters) {
// //     dictionary.items.push({
// //       name: filter,
// //       type: "filter",
// //     });
// //   }
// //   await dictionary.save();
// // };
// module.exports = { dictionaryDishBuilder };
