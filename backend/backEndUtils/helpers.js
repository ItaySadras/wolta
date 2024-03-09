const Restaurant = require("../roots/models/restaurantModel");
const Dish = require("../roots/models/dishModel");
const MenuCategory = require("../roots/models/menuCategoryModel");
const Menu = require("../roots/models/menuModel");
const Reviews = require("../roots/models/reviewModel");
const Customer = require("../roots/models/customerModel");

const { getDay, getMinutes, getHours, isPast, isFuture } = require("date-fns");

const isThisRestaurantOpen = (restaurant) => {
  if (!restaurant.open) {
    return false;
  }

  const today = getDay(new Date());
  const { openingHour, closingHour } = defaultOpeningTime[today - 1];

  const [hourOpen, minutesOpen] = openingHour.split(":").map(Number);
  const [hourClose, minutesClose] = closingHour.split(":").map(Number);

  const now = new Date();
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

const mongoose = require('mongoose');

async function getRestaurantsWithDetails(restaurants) {
 try {
    // Assuming restaurants is an array of Mongoose documents
    const populatedRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        // Correctly use populate on a Mongoose query
        return await mongoose.model('Restaurant').findById(restaurant._id)
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
          .exec(); // Execute the query
      })
    );


    return populatedRestaurants;
  } catch (error) {
    console.error("Error populating restaurant details:", error);
    throw error;
  }
}

const getsADishRestaurant = async (dishes) => {
  const dishesIds = dishes.map((dish) => dish._id);
  const menuCategories = await MenuCategory.find({
    dishes: { $in: dishesIds },
  });
  const menus = await Promise.all(
    menuCategories.map(async (menuCategory) => {
      return menuCategory.populate({
        path: "menu",
      });
    })
  );

  const menusIds = menus.map((menuCategory) => menuCategory.menu._id);
  const distinctRestaurantIds = await Restaurant.distinct("_id", {
    menu: { $in: menusIds },
  });

  // Now, you have an array of distinct restaurant IDs. You can use these IDs to find the full restaurant documents.
  const restaurants = await Restaurant.find({
    _id: { $in: distinctRestaurantIds },
  }).limit(4).exec();
const populatedRestaurants= await getRestaurantsWithDetails(restaurants)
  return populatedRestaurants;
};

//   async function calculateRoute(origin,destination) {
// //    const origin=formatAddress(addressA)
// //    const destination=formatAddress(addressB)

//     if (!origin || !destination) {
//       console.error("Origin or destination is not set");
//       return;
//     }
//     console.log("Origin:", origin);
//     console.log("Destination:", destination);
//     const directionService = new google.maps.DirectionsService();
//     const results = await directionService.route({
//       origin,
//       destination,
//       travelMode: google.maps.TravelMode.BICYCLING,
//     });
//     console.log(results);
//     return results

//   }

//   const formatAddress=async(address)=>{
//    return  `${newOrigin.street+" "+newOrigin.streetNumber+" "+newOrigin.city+" "+newOrigin.country}`
//   }
//   const currOrigin = `${newOrigin.street+" "+newOrigin.streetNumber+" "+newOrigin.city+" "+newOrigin.country}`

module.exports = {
  isThisRestaurantOpen,
  uploadToCloudinary,
  paginateHelper,
  getRestaurantsWithDetails,
  getsADishRestaurant,
};