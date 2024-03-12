const mongoose = require("mongoose");

const courierSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    mode: ["DRIVING","WALKING", "BICYCLING"],
    default: "DRIVING"
  },
  available: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  currentOrder: {
    type: mongoose.Schema.Types.ObjectId, ref: "Order" ,default: null,
  },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
});

const Courier = mongoose.model("Courier", courierSchema);
module.exports = Courier;
