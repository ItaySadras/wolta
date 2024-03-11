const searchAlgorithm = require("../../backEndUtils/searchBackend");
const Dictionary = require("../models/dictionaryModel");
const Dish = require("../models/dishModel");
const MenuCategory = require("../models/menuCategoryModel");
const Menu = require("../models/menuModel");
const Restaurant = require("../models/restaurantModel");
const Reviews = require("../models/reviewModel");
const jwt = require("jsonwebtoken");
secret = "secretkey";
const {
  paginateHelper,
  getsADishRestaurant,
  getRestaurantsWithDetails,
  getsADishesRestaurants,
} = require("../../backEndUtils/helpers");

exports.TheGreatFilter = async (req, res) => {
  let paginatedRestaurants, cool, populatedRestaurants;
  try {
    let { filter, page, limit } = req.query;
    const { restaurants, dishes } = await searchAlgorithm(req.params.searched);

    let dishQuery = { _id: { $in: dishes } };
    let restaurantQuery = { _id: { $in: restaurants } };

    if (filter && filter.length > 0) {
      dishQuery.intolerances = { $all: filter };
      restaurantQuery.restaurantFilter = { $all: filter };
    }

    const populatedDishes = await Dish.find(dishQuery);

    if (restaurants.length === 0) {
      populatedRestaurants = await getsADishesRestaurants(populatedDishes);
    } else {
      FilteredRestaurants = await Restaurant.find(restaurantQuery).limit(4);
      populatedRestaurants = await getRestaurantsWithDetails(
        FilteredRestaurants
      );
    }

    res.status(200).send({
      Message: "success",
      dishes: populatedDishes,
      restaurants: populatedRestaurants,
    });
  } catch (error) {
    console.log("🚀 ~ exports.TheGreatFilter= ~ error:", error);
    res.status(500).send({ Message: "intarnel server error" });
  }
};

exports.createSearchCookie = async (req, res, next) => {
  try {
    const { searched } = req.params;
    let SearchHistoryToken = [];

    if (req.cookies && req.cookies.s) {
      SearchHistoryToken = jwt.verify(req.cookies.s, secret).SearchHistoryToken;
    }

    const index = SearchHistoryToken.findIndex(
      (item) => item.name === searched
    );

    if (index === -1) {
      SearchHistoryToken.push({ name: searched, count: 1 });
    } else {
      SearchHistoryToken[index].count++;
    }

    res.cookie(
      "s",
      jwt.sign({ SearchHistoryToken: SearchHistoryToken }, secret),
      {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }
    );
  } catch (error) {
    console.log("error in creating search history  cookie", error);
  }
  next();
};

exports.getsSearchPreferencesFromCookies = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    if (req.cookies.s) {
      const { SearchHistoryToken } = jwt.verify(req.cookies.s, secret);
      SearchHistoryToken.sort((a, b) => b.count - a.count);
      req.params.searched = SearchHistoryToken[0].name;
      next();
    } else {
      const restaurants = await Restaurant.find({}).limit(4);
      const populatedRestaurants = await getRestaurantsWithDetails(restaurants);
      const dishes = await Dish.find({}).limit(100);
      res.status(200).send({
        Message: "success",
        restaurants: paginateHelper(populatedRestaurants, 1, 4),
        dishes: paginateHelper(dishes),
      });
    }
  } catch (error) {
    console.log("🚀 ~ exports.createSearchCookie= ~ error:", error);
    next();
  }
};
