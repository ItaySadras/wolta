const SurveyValidation = require("../models/SurveyValidationModel");
const Restaurant = require("../models/restaurantModel");
const Review = require("../models/reviewModel");
const { format } = require("date-fns");

exports.createReview = async (req, res) => {
  try {
    const { secretKey } = req.query;
    const surveyValidation = await SurveyValidation.findByIdAndDelete({
      crypt: secretKey,
    });
    if (!surveyValidation) {
      res.status(403).status({message:"this link was already filled"});
    }
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    !restaurant &&
      res.status(404).send({ message: "Couldn't found restaurant." });

    const now = new Date();
    const newReview = await Review.create({
      ...req.body,
      Restaurant: restaurant._id,
      whenSubmitted: now,
    }).populate("customerId")
    restaurant.Reviews.push(newReview._id);

    restaurant.save();
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error, failed to create review",
      message: error.message,
    });
  }
};
exports.deleteReview = async (req, res) => {};
