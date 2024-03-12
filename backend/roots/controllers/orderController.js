const { isThisRestaurantOpen, distanceCalculate,ignoreMin } = require("../../backEndUtils/helpers");
const { sendAReviewSurvey } = require("../../backEndUtils/twilio");
const Courier = require("../models/courierModel");
const Customer = require("../models/customerModel");
const Order = require("../models/orderModel");
const Restaurant = require("../models/restaurantModel");

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, customerId, orderDishes } = req.body;
    const restaurant = await Restaurant.findById(restaurantId).populate(
      "address"
    );
    const customer = await Customer.findById(customerId).populate("addresses");

    if (!isThisRestaurantOpen(restaurant)) {
      return res.status(403).send({ message: "This restaurant is closed now" });
    }

    const availableCouriers = await Courier.find({
      available: true,
      currentOrder: null,
    }).populate("address");

    if (!availableCouriers || availableCouriers.length === 0) {
      return res.status(404).send({ message: "There is no available courier" });
    }

    // Calculate distance between each courier and the restaurant
    const couriersWithDistance =await Promise.all( availableCouriers.map(async(courier) => {
      return  {
        courier : courier.toObject(),
        distance:await distanceCalculate(courier.address, restaurant.address),
      };
    }));
    console.log("🚀 ~ couriersWithDistance ~ courier.vehicleType:",couriersWithDistance)
    

    // Sort couriers by distance from the restaurant
    couriersWithDistance.sort((a, b) => ignoreMin(a.distance) - ignoreMin(b.distance));

    // Get the closest courier to the restaurant
   const closestCourier = couriersWithDistance[0];
    
    // duration from restaurant to customer
    const arrivingTime = await distanceCalculate(restaurant.address,customer.addresses[0]);


    // Create the order and assign it to the closest courier
    const order = await Order.create({
      orderDishes: orderDishes,
      courier: closestCourier._id, // Assign the courier to the order
      arrivingTime: ignoreMin(arrivingTime) + ignoreMin(closestCourier.distance),
      restaurant: restaurant._id,
      customer: customer._id,
    });
    populatedOrder = await Order.populate(order, [
      { path: "customer" },
      { path: "courier" },
      { path: "restaurant" },
      {
        path: "orderDishes.dish",
        model: "Dish"
      },
    ]);
      

    // Update the restaurant's open orders
    await Restaurant.findByIdAndUpdate(restaurantId, {
      $push: { openOrders: populatedOrder._id },
    });
    //update courier order
    const newClosestCourier  = await Courier.findByIdAndUpdate(closestCourier.courier._id,{currentOrder: order._id});
    !newClosestCourier && res.status(403).send({message:"Could not address order for courier",error});
    // Respond with success
    res
      .status(200)
      .send({ message: "Order created successfully", order: populatedOrder });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId).populate(
      "customer"
    );
    const { customer } = order;
    !order &&
      res.status(404).send({ message: "couldn't find order and delete it" });
    const courier = await Courier.findOneAndUpdate(
      { currentOrder: req.params.orderId },
      { currentOrder: null },
      { new: true }
    );
    !courier &&
      res
        .status(500)
        .send({ message: "server error fail to delete order from courier" });

    const restaurant = await Restaurant.find(
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

    sendAReviewSurvey(customer.userName, customer.phoneNumber);
  } catch (error) {
    console.log("🚀 ~ exports.deleteOrder ~ error:", error);
    res.status(500).send({ message: "internal server error" });
  }
};
