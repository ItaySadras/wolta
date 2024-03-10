const { isThisRestaurantOpen } = require("../../backEndUtils/helpers");
const { sendAReviewSurvey } = require("../../backEndUtils/twilio");
const Address = require("../models/addressModel");
const Courier = require("../models/courierModel");
const Customer = require("../models/customerModel");
const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, customerId, dishes,customerAddressId } = req.body;
    const restaurant = await Restaurant.findById(restaurantId);
    const customer = await Customer.findById(customerId);
    const customerAddress=await Address.findById(customerAddressId)
    !isThisRestaurantOpen(restaurant) &&
      res.status(403).send({ message: "this restaurant closed now" });
    const availableCouriers = await Courier.find({
      available: true,
      currentOrder: null,
    });
    !availableCouriers &&
      res.status(404).send({ message: "there is no available courier" });
    const CourierByOrder = availableCouriers.sort(
      (a, b) =>
        distanceCalculate(a.address, restaurant.address) +
        distanceCalculate(b.address, restaurant.address)
    );
    const arrivingTime =
      distanceCalculate(CourierByOrder[0], restaurant.address) +
      distanceCalculate(CourierByOrder[0], customerAddress);
    const order = await Order.create({
      orderDishes:dishes,
      courier: CourierByOrder[0],
      arrivingTime: arrivingTime,
    });
    
    await Restaurant.findByIdAndUpdate(restaurantId, {
        $push: { openOrders: order._id },
      });
  } catch (error) {
    console.log("🚀 ~ exports.createOrder= ~ error:", error)
    res.status(500).send({ message: "internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId).populate("customer");
    const {customer}=order
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

    sendAReviewSurvey(customer.userName,customer.phoneNumber)

  } catch (error) {
    console.log("🚀 ~ exports.deleteOrder ~ error:", error)
    res.status(500).send({ message: "internal server error" });
  }
};



