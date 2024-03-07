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
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],

  vehicleType: {
    type: String,
    enum: ["Car", "Motorbike", "Bike", "Truck"],
    required: false,
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
  currentReservation:{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }
});

const Courier = mongoose.model("Courier", courierSchema);
module.exports = Courier;
