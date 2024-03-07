const Order = require("../models/orderModel")

exports.createOrder = async (req, res) => {
    const order =Order.create({})
}