const Currior = require("../models/curriorModel");

module.exports.createCurrior = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    const newCurrior = new Currior({
      name,
      phone,
      email,
      address,
    });
    await newCurrior.save();
    res
      .status(201)
      .json({ message: "Currior created successfully", currior: newCurrior });
  } catch (error) {
    console.error("Error creating Currior:", error);
    res
      .status(500)
      .json({ message: "Error creating Currior", error: error.message });
  }
};

module.exports.setAvailable = async (req, res) => {
  try {
    const { id } = req.params;
    let currior = await Currior.findById(id);
    if (!currior) {
      return res.status(404).json({ message: "Courier not found" });
    }
    currior.available = !currior.available;
    await currior.save();
    res
      .status(200)
      .json({ message: "Courier availability updated successfully", currior });
  } catch (error) {
    console.error("Error updating Currior availability:", error);
    res.status(500).json({
      message: "Error updating Currior availability",
      error: error.message,
    });
  }
};

module.exports.setRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    let currior = await Currior.findById(id);

    if (!currior) {
      return res.status(404).json({ message: "Courier not found" });
    }
    if (rating >= 0 && rating <= 5) {
      currior.totalRating += rating;
      currior.numberOfRatings += 1;
      currior.rating = currior.totalRating / currior.numberOfRatings;
    } else {
      res
        .status(500)
        .json({
          message: "Invalid rating amount",
          error: error.message,
        });
    }

    await currior.save();

    res
      .status(200)
      .json({ message: "Courier rating updated successfully", currior });
  } catch (error) {
    console.error("Error updating Currior rating:", error);
    res
      .status(500)
      .json({ message: "Error updating Currior rating", error: error.message });
  }
};
