const searchAlgorithm = require("../../backEndUtils/searchBackend");
const Dictionary = require("../models/dictionaryModel");
const Dish = require("../models/dishModel");
const MenuCategory = require("../models/menuCategoryModel");
const Menu = require("../models/menuModel");
const Restaurant = require("../models/restaurantModel");
const Reviews = require("../models/reviewModel");
const jwt = require("jsonwebtoken");
secret = "secretkey";
const { search } = require("../routes/adminRoute");
const { paginateHelper } = require("../../backEndUtils/helpers");

exports.TheGreatFilter = async (req, res) => {
  let paginatedRestaurants, cool, populatedRestaurants;
  try {
    let { filter, page, limit } = req.query;
    const dictionary = await Dictionary.find({});
    const { restaurants, dishes } = searchAlgorithm(
      req.params.searched,
      dictionary[0]
    );
    const populatedDishes = [];
    const populatedRestaurants = [];
    for (const dish of dishes) {
      const populatedDish = await Dish.findById(dish.dishId);
      populatedDishes.push(populatedDish);
    }

    if (restaurants.length === 0) {
      for (const dish of populatedDishes) {
        const menuCategory = await MenuCategory.findById(dish.menuCategory);
        const menu = await Menu.findById(menuCategory.menu);
        const populatedRestaurant = await Restaurant.findById(menu)
          .populate({
            path: "menu",
            populate: {
              path: "menuCategories",
              populate: {
                path: "dishes",
              },
            },
          })
          .populate({
            path: "Reviews",
            populate: {
              path: "customerId",
            },
          });
        if (
          populatedRestaurants.some(
            (res) => res._id.toString() !== restaurants._id
          )
        ) {
          populatedRestaurants.push(populatedRestaurant);
        }
      }
    }
    for (const restaurant of restaurants) {
      const populatedRestaurant = await Restaurant.findById(
        restaurant.restaurantId
      )
        .populate({
          path: "menu",
          populate: {
            path: "menuCategories",
            populate: {
              path: "dishes",
            },
          },
        })
        .populate({
          path: "Reviews",
          populate: {
            path: "customerId",
          },
        });
      populatedRestaurants.push(populatedRestaurant);
    }

    updateCookiesBtSearch(req.params.search, req.cookie);
    res.status(200).send({
      Message: "success",
      dishes: paginateHelper(
        handleDishFilter(filter, populatedDishes),
        page,
        limit
      ),
      restaurants: handleRestaurantFilter(filter, populatedRestaurants),
    });
  } catch (error) {
    console.log("🚀 ~ exports.TheGreatFilter= ~ error:", error);
    res.status(500).send({ Message: "intarnel server error" });
  }
};


exports.createSearchCookie = async (req, res, next) => {
 const { search } = req.params;
 let SearchHistoryToken = [];

 if (req.cookies.s) {
    try {
      SearchHistoryToken = jwt.verify(req.cookies.s, secret);
    } catch (error) {
      console.error('Error verifying JWT:', error);
    }
 }

 const index = SearchHistoryToken.findIndex((item) => item.name === search);

 if (index === -1) {
    SearchHistoryToken.push({ name: search, count: 1 });
 } else {
    SearchHistoryToken[index].count++;
 }

 res.cookie("s", jwt.sign(SearchHistoryToken, secret), {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, 
 });

 next();
};


const handleDishFilter = (filter, dishes) => {
  if (filter) {
    if (typeof filter === "string") {
      filter = [filter];
    }
    const filterdDishes = dishes.filter((dish) =>
      dish.intolerances.some((resFilter) =>
        filter.every((searchFilter) => searchFilter === resFilter)
      )
    );
    return filterdDishes;
  }
};
const handleRestaurantFilter = (filter, restaurant) => {
  if (filter) {
    if (typeof filter === "string") {
      filter = [filter];
    }
    const filterdRestaurent = restaurant.filter((res) =>
      res.restaurantFilter.some((resFilter) =>
        filter.every((searchFilter) => searchFilter === resFilter)
      )
    );
    return filterdRestaurent;
  }
};
