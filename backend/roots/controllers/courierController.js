const { reverseGeocode } = require("../../backEndUtils/helpers");
const Address = require("../models/addressModel");

const Courier = require("../models/courierModel");

exports.getCourierDetails = async (req, res) => {
  try {
    const courierId = req.params.id;
    const courier = await Courier.findById(courierId).populate({
      path: "currentOrder",
      populate: [
        { path: "customer",populate:{path:"addresses"} },
        { path: "restaurant",populate:{path:"address"} },
        {
          path: "orderDishes.dish",
          model: "Dish",
        },
        
      ],
    }).populate("address");

    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    res.status(200).json({ courier: courier });
  } catch (error) {
    console.error("Error fetching courier details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// .populate({
//   path: "menu",
//   populate: {
//     path: "menuCategories",
//     populate: {
//       path: "dishes",
//     },
//   },
exports.createCourier = async (req, res) => {
  try {
    const { userName, phoneNumber, email, address, password,vehicleType } = req.body;
    const newCourier = await Courier.create({
      userName,
      phoneNumber,
      email,
      address,
      password,
      vehicleType,
    })
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
exports.setNotAvailable = async (req, res) => {
  try {
    const { id } = req.params;
    let courier = await Courier.findById(id);

    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    courier.available = false;
    await courier.save();
    res.status(200).json({ message: "Courier is now NOT available", courier });
  } catch (error) {
    console.error("Error updating Courier's to Not availabile:", error);
    res.status(500).json({
      message: "Error updating Courier's Not availabe",
      error: error.message,
    });
  }
};

exports.setAvailable = async (req, res) => {
  try {
    const { id } = req.params;
    let courier = await Courier.findById(id);

    if (!courier) {
      return res.status(404).json({ message: "Courier not found" });
    }
    courier.available = true;
    courier.currentOrder = null;

    const { latitude, longitude } = req.body;

    if (latitude && longitude) {
      console.log("🚀 ~ exports.setAvailable= ~ longitude:", longitude);
      console.log("🚀 ~ exports.setAvailable= ~ latitude:", latitude);

      const address = await reverseGeocode(latitude, longitude);
      if (address) {
        // Create a new Address instance using the address data
        console.log(
          "🚀 ~ exports.setAvailable= ~ streetNumber:",
          typeof address.streetNumber
        );
        const newAddress = new Address({
          streetName: address.streetName,
          streetNumber: address.streetNumber,
          city: address.city,
          country: address.country,
        });
        await newAddress.save(); // Save the new address to the database
        courier.address = newAddress; // Assign the new address to the courier
      }
    }

    await courier.save();
    res.status(200).json({ message: "Courier is now available!", courier });
  } catch (error) {
    console.error("Error updating Courier's availability:", error);
    res.status(500).json({
      message: "Error updating Courier's availability",
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
      console.log("not good");
      res.status(500).json({ message: "Invalid rating amount" });
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

// exports.setCurrOrder= async (req, res) => {
//   try {
//     const { id } = req.params;
//     let courier = await Courier.findById(id);
//     if (!courier) {
//       return res.status(404).json({ message: "Courier not found" });
//     }
//     if (courier.currentOrder){
//       //  ***** NEED TO CHANGE ONCE WE MAKE THE ORDER FORM ****
//       courier.currentOrder= req.body.order;
//       //  ***** NEED TO CHANGE ONCE WE MAKE THE ORDER FORM ****
//     }
//     else{
//       courier.currentOrder=null;
//     }
//   } catch (error) {
//     console.error("Error updating Courier's current order:", error);
//     res.status(500).json({
//       message: "Error updating Courier's current order",
//       error: error.message,
//     });
//   }
// }
