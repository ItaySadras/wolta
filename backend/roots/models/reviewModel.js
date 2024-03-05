const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  grade: {
    type: Number,
    min: 0, 
    max: 5,
  },
  comment: { type: String },
  whenSubmitted: { type: Date },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
