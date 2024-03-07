const Restaurant = require("../models/restaurantModel");
const Menu = require("../models/menuModel");
const  dishModel= require("../models/dishModel");
const menuCategoryModel = require("../models/menuCategoryModel");
const reviewModel = require("../models/reviewModel");

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
      .send({ status: "internal server error", message: error.message });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({})
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

    if (restaurants.length > 0) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      paginatedRestaurants = restaurants.slice(startIndex, endIndex);
      res.status(200).send({
        message: "Restaurants retrieved successfully",
        restaurants: paginatedRestaurants,
      });
    } else {
      res.status(404).send({ message: "No restaurants found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ status: "internal server error", message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.restaurantId,
    req.body.easilyUpdate,
    { new: true }
  );
};

exports.updateRestaurantHours = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    for (const [day, time] of req.body) {
      restaurant.defaultOpeningTime[day] = time;
    }
    await restaurant.save()
    res.status(200).send({message:"hors updated sucssfully"})
  } catch (error) {
    res.status(500).send({message:"fail inetrnal server error"})
  }

};

exports.deleteRestaurantFilter = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    restaurant.restaurantFilter = restaurant.restaurantFilter.filter(
      (item) => item != req.body.item
    );
    restaurant.save();
    res.status(200).send({ message: "item deleted sucssfully" });
  } catch (error) {
    res.status(500).send({message:"fail inetrnal server error"})

  }
};
exports.addRestaurantFilter = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.restaurantId,
      { restaurantFilter: [...restaurantFilter, req.body.item] }
    );
    res.status(200).send({
      message: "item add sucssfully",
      restaurantFilter: restaurant.restaurantFilter,
    });
  } catch (error) {
    res.status(500).send({message:"fail inetrnal server error"})

  }
};
exports.updateRestaurant = async (req, res) => {
  try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
  } catch (error) {
    res.status(500).send({message:"fail inetrnal server error"})

  }
};
