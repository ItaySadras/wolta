const Restaurant = require("../roots/models/restaurantModel");
const Dish = require("../roots/models/dishModel");
const MenuCategory = require("../roots/models/menuCategoryModel");
const Menu = require("../roots/models/menuModel");
const Reviews = require("../roots/models/reviewModel");
const Customer = require("../roots/models/customerModel");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const apiKey = process.env.MAPS_API_KEY;
const mongoose = require("mongoose");

const { cloudinary } = require("./cloudinarySetUp");

const { getDay, getMinutes, getHours, isPast, isFuture, addDays, addHours } = require("date-fns");

function ignoreMin(duration){
    const parts = duration.split(' ');
    const minutesString= parts[0];
    const minutes=parseInt(minutesString,10);
    return minutes;
} 


const isThisRestaurantOpen = (restaurant) => {
  if (!restaurant.open) {
    return false;
  }

  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "Israel",
  });
  const twoHoursAgo = new Date(currentDate);
  const now = addHours(twoHoursAgo, 2);
  const today = getDay(now);
  if (restaurant.defaultOpeningTime[today]) {
    const { openingHour, closingHour } = restaurant.defaultOpeningTime[today];

    const [hourOpen, minutesOpen] = openingHour.split(":").map(Number);
    const [hourClose, minutesClose] = closingHour.split(":").map(Number);

    const openingHourDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hourOpen,
      minutesOpen
    );
    const closingHourDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hourClose,
      minutesClose
    );

    if (now >= openingHourDate && now <= closingHourDate) {
      return true;
    }
  }

  return false;
};
const uploadToCloudinary = async (imageUrl, title) => {
  try {
    const response = await cloudinary.uploader.upload(imageUrl, {
      public_id: `${title}`,
    });
    return response.url;
  } catch (error) {
    console.error("Error uploading image:");
    return false;
  }
};
const paginateHelper = (array, pageInput, limitInput) => {
  if (array.length > 0) {
    const page = parseInt(pageInput) || 1;
    const limit = parseInt(limitInput) || 10;
    startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
  }
};

async function getRestaurantsWithDetails(restaurants) {
  try {
    // Assuming restaurants is an array of Mongoose documents
    const populatedRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        // Correctly use populate on a Mongoose query
        return await mongoose
          .model("Restaurant")
          .findById(restaurant._id)
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
          }).populate({path:"address"})
          .exec(); // Execute the query
      })
    );

    return populatedRestaurants;
  } catch (error) {
    console.error("Error populating restaurant details:", error);
    throw error;
  }
}
const getsADishRestaurant = async (dishId) => {
  const menuCategories = await MenuCategory.find({
    dishes: { $in: dishId },
  }).populate({ path: "menu" });
  const menu = menuCategories[0].menu._id;
  const restaurant = await Restaurant.find({ menu: menu });
  console.log("🚀 ~ getsADishRestaurant ~ restaurant:", restaurant);
  populatedRestaurants = await getRestaurantsWithDetails(restaurant);
  return populatedRestaurants;
};
const getsADishesRestaurants = async (dishes) => {
  const dishesIds = dishes.map((dish) => dish._id);

  const restaurant = await Promise.all(
    dishesIds.map(async (dishId) => {
      return getsADishRestaurant(dishId);
    })
  );
  return restaurant;
};


async function distanceCalculate(origin, destination) {


  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin: origin,
          destination: destination,
          mode: mode,
          key: apiKey,
        },
      }
      );
      
    if (response.data.status === "OK") {
      const duration = response.data.routes[0].legs[0].duration.text;
      return duration;
    } else {
      console.error("Error:fetching geo api response");
      return null;
    }
  } catch (error) {
    console.error("Error: in try distanceCalculate");
    return null;
  }
}

async function reverseGeocode(latitude, longitude) {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          latlng: `${latitude},${longitude}`,
          key: apiKey,
        },
      }
    );
    if (response.data.status === "OK") {
      const addressComponents = response.data.results[0].address_components;
      console.log(
        "🚀 ~ reverseGeocode ~ response.data.results[0].address_components:",
        response.data.results[0]
      );
      const address = {
        streetName: addressComponents[1].long_name, // Assuming street name is at index 1
        streetNumber: addressComponents[0].long_name, // Assuming street number is at index 0
        city: addressComponents[2].long_name, // Assuming city name is at index 2
        country: addressComponents[addressComponents.length - 1].long_name, // Assuming country name is at the last index
      };
      // console.log("🚀 ~ reverseGeocode ~ address:", address);
      return address;
    } else {
      console.error("Error:", response.data.status);
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

module.exports = {
  isThisRestaurantOpen,
  uploadToCloudinary,
  paginateHelper,
  getRestaurantsWithDetails,
  getsADishRestaurant,
  reverseGeocode,
  distanceCalculate,
  getsADishesRestaurants,
  ignoreMin
};
