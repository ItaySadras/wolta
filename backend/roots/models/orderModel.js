const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({

    customer:{type: mongoose.Schema.Types.ObjectId, ref: "Customer"},
    courier:{type: mongoose.Schema.Types.ObjectId, ref: "Courier"},
    restaurant:{type: mongoose.Schema.Types.ObjectId, ref: "Restaurant"},
    orderDishes:{dish:{type: mongoose.Schema.Types.ObjectId, ref: "Dish"},comment:{type:String}},
    arrivingTime:{type:String}

    
});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;


