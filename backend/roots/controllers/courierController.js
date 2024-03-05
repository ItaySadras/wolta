const Courier = require("../models/courierModel");

exports.createCourier = async (req, res) => {
  try {
    const { userName, phoneNumber, email, address, password } = req.body;
    const newCourier = new Courier({
      userName,
      phoneNumber,
      email,
      address,
      password,
    });
    await newCourier.save();
    res
      .status(201)
      .json({ message: "Courier created successfully", courier: newCourier });
  } catch (error) {
    console.error("Error creating Courier:", error);
    res
      .status(500)
      .json({ message: "Error creating Courier", error: error.message });
  }
};

exports.setAvailable = async (req, res) => {
  try {
    const { id } = req.params;
    let courier = await Courier.findById(id);
    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    courier.available = !courier.available;
    await courier.save();
    res
      .status(200)
      .json({ message: "Courier availability updated successfully", courier });
  } catch (error) {
    console.error("Error updating Courier availability:", error);
    res.status(500).json({
      message: "Error updating Courier availability",
      error: error.message,
    });
  }
};

exports.setRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    let courier = await Courier.findById(id);
    // console.log(rating + " rating");
    // console.log(courier.totalRating + "total Rating");
    // console.log(courier.numberOfRatings + "num of ratings");
    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    if (rating < 0 || rating > 5) {
      console.log("not good")
      res
        .status(500)
        .json({ message: "Invalid rating amount"});
    } else {
      courier.totalRating += rating;
      courier.numberOfRatings += 1;
      courier.rating = courier.totalRating / courier.numberOfRatings;
      await courier.save();
    }

    res
      .status(200)
      .json({ message: "Courier rating updated successfully", courier });
  } catch (error) {
    console.error("Error updating Courier rating:", error);
    res
      .status(500)
      .json({ message: "Error updating Courier rating", error: error.message });
  }
};
