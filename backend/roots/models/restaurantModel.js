const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String },
  userName: { type: String },
  password: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  open: { type: Boolean },
  photo: { type: String },
  defaultOpeningTime: [
    {
      openingHour: { type: String, required: true },
      closingHour: { type: String, required: true },
    },
  ],
  menu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
  Reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  restaurantFilter: [{ type: String }],
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  openOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  image: { type: String },
  socketId: { type:String},

});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;

// Phone number
// Dish{name, category ,image, restaurant, ingredients, intolerance, price}
// Review:{who wrote, grade(1-5), comment, when submitted}
// Menu category{name, array of dishes[]}
// Menu{categories[], relevant restaurant}
// Restaurant{Menu, location(address), open/closed,default opening time[{opening hour:12PM,closing hour:12AM}], filter data[kosher,vegetarian, vegan …],Reviews:[reviews], user:user_id
