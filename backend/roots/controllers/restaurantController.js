const Restaurant = require("../models/restaurantModel");
const Menu = require("../models/menuModel");
const dishModel = require("../models/dishModel");
const menuCategoryModel = require("../models/menuCategoryModel");
const reviewModel = require("../models/reviewModel");
secret = "secretkey";
const jwt = require("jsonwebtoken");
const {
  paginateHelper,
  getRestaurantsWithDetails,
} = require("../../backEndUtils/helpers");
const searchAlgorithm = require("../../backEndUtils/searchBackend");

exports.createRestaurant = async (req, res) => {
  try {
    const { userName, password, email, phoneNumber } = req.body;
    const newRestaurant = new Restaurant({
      userName,
      password,
      email,
      phoneNumber,
    });
    await newRestaurant.save();
    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });
  } catch (error) {
    res.status(404).json({
      status: failed,
      message: error.message,
    });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId)
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
      })
      .populate({
        path: "address",
      });

    if (restaurant) {
      res
        .status(200)
        .send({ message: "Restaurant exists", restaurant: restaurant });
    } else {
      res.status(404).send({ message: "Restaurant does not exist" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: "internal server error", message: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    let restaurants;
    const { limit, page } = req.query;
    if (req.cookies.s) {
      const search = getsSearchPreferencesFromCookies(req.cookies.s);
      const response = await searchAlgorithm(search);
      restaurants = response;
    } else {
      restaurants = await Restaurant.find({});
    }
    const populatedRestaurant = await getRestaurantsWithDetails(restaurants);
    const paginatedRestaurants = paginateHelper(
      populatedRestaurant,
      page,
      limit
    );
    res
      .status(200)
      .send({ message: "success", restaurant: paginatedRestaurants });
  } catch (error) {
    res
      .status(500)
      .send({ status: "internal server error", message: error.message });
  }
};

exports.updateGenericRestaurantData = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      req.body,
      { new: true }
    );
    !restaurant && res.status(404).send({ message: "couldnt find restaurant" });

    res.status(200).send({
      message: "relevant restaurant data updated sucssfuly",
      restaurant: restaurant,
    });
  } catch (error) {
    res.status(500).send({ message: "intarnel server error" });
  }
};

const getsSearchPreferencesFromCookies = (searchCookie) => {
  const { SearchHistoryToken } = jwt.verify(searchCookie, secret);
  SearchHistoryToken.sort((a, b) => b.count - a.count);
  return SearchHistoryToken[0].name;
};
// exports.updateRestaurantHours = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.restaurantId);
//     for (const [day, time] of req.body) {
//       restaurant.defaultOpeningTime[day] = time;
//     }
//     await restaurant.save();
//     res.status(200).send({ message: "hors updated sucssfully" });
//   } catch (error) {
//     res.status(500).send({ message: "fail inetrnal server error" });
//   }
// };

// exports.deleteRestaurantFilter = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.restaurantId);
//     restaurant.restaurantFilter = restaurant.restaurantFilter.filter(
//       (item) => item != req.body.item
//     );
//     restaurant.save();
//     res.status(200).send({ message: "item deleted sucssfully" });
//   } catch (error) {
//     res.status(500).send({ message: "fail inetrnal server error" });
//   }
// };
// exports.addRestaurantFilter = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findByIdAndUpdate(
//       req.params.restaurantId,
//       { restaurantFilter: [...restaurantFilter, req.body.item] }
//     );
//     res.status(200).send({
//       message: "item add sucssfully",
//       restaurantFilter: restaurant.restaurantFilter,
//     });
//   } catch (error) {
//     res.status(500).send({ message: "fail inetrnal server error" });
//   }
// };
// exports.updateRestaurant = async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.restaurantId);
//   } catch (error) {
//     res.status(500).send({ message: "fail inetrnal server error" });
//   }
// };

exports.restaurantUpdater = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    !restaurant && res.status(404).send({ message: "cant find restaurant" });
    console.log(
      "🚀 ~ exports.restaurantUpdater= ~ Object.entries(req.body)[0]:",
      Object.entries(req.body)[0]
    );
    const [key, value] = Object.entries(req.body)[0];
    switch (key) {
      case "open" && "restaurantName" && "defaultOpeningTime":
        restaurant[key] = value;

        break;
      case "restaurantFilter":
        restaurant[key] = addToArrays(
          key,
          req.query.action,
          value,
          restaurant[key]
        );
        break;

      default:
        res
          .status(500)
          .send({ message: `restaurant does not have a key named ${key}` });

        break;
    }
    await restaurant.save();
    res.status(200).send({ message: "sucsses", updatedRestaurant: restaurant });
  } catch (error) {
    res.status(500).send({ message: "this action doesnt exist" });
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
