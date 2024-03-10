const { isThisRestaurantOpen, distanceCalculate } = require("../../backEndUtils/helpers");
const Address = require("../models/addressModel");
const Courier = require("../models/courierModel");
const Customer = require("../models/customerModel");
const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, customerId, dishes, customerAddressId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    const customer = await Customer.findById(customerId);
    const customerAddress = await Address.findById(customerAddressId);

    if (!isThisRestaurantOpen(restaurant)) {
      return res.status(403).send({ message: "This restaurant is closed now" });
    }

    const availableCouriers = await Courier.find({
      available: true,
      currentOrder: null,
    });

    if (!availableCouriers || availableCouriers.length === 0) {
      return res.status(404).send({ message: "There is no available courier" });
    }

    // Calculate distance between each courier and the restaurant
    const couriersWithDistance = availableCouriers.map(courier => {
      return {
        courier,
        distance: distanceCalculate(courier.address, restaurant.address)
      };
    });

    // Sort couriers by distance from the restaurant
    couriersWithDistance.sort((a, b) => a.distance - b.distance);

    // Get the closest courier to the restaurant
    const closestCourier = couriersWithDistance[0].courier;

    // Calculate arriving time for the closest courier
    const arrivingTime = distanceCalculate(closestCourier.address, restaurant.address);

    // Create the order and assign it to the closest courier
    const order = await Order.create({
      orderDishes: dishes,
      courier: closestCourier._id, // Assign the courier to the order
      arrivingTime: arrivingTime,
    });

    // Update the restaurant's open orders
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { openOrders: order._id },
    });
    //update courier order
    closestCourier.currentOrder = order._id;
    await closestCourier.save();

    // Respond with success
    res.status(200).send({ message: "Order created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    !order &&
      res.status(404).send({ message: "couldn't find order and delete it" });
    const courier =await Courier.findOneAndUpdate(
      { currentOrder: req.params.orderId },
      { currentOrder: null },
      { new: true }
    );
    !courier &&
      res
        .status(500)
        .send({ message: "server error fail to delete order from courier" });

    const restaurant =await Restaurant.find(
      {
        openOrders: { $in: [req.params.orderId] },
      },
      { new: true }
    );
    !restaurant &&
      res
        .status(500)
        .send({ message: "server error fail to delete order from restaurant" });

    restaurant.openOrders = restaurant.openOrders.filter(
      (order) => order.toString() !== req.params.orderId
    );
    await restaurant.save();
    // send a reveiw form for the customer


  } catch (error) {
    console.log("🚀 ~ exports.deleteOrder ~ error:", error)
    res.status(500).send({ message: "internal server error" });
  }
};

