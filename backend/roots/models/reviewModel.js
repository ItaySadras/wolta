const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  customerName: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  grade: { type: Number },
  comment: { type: String },
  whenSubmitted: { type: Date },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

