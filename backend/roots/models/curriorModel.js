const mongoose = require('mongoose');

const curriorSchema= new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type : String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        enum: ['Car', 'Motorbike', 'Bike', 'Truck'],
        required: false
    },
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0
    },
    numberOfRatings: {
        type: Number,
        default: 0
    },
    totalRating: {
        type: Number,
        default: 0
    }
})

const Currior = mongoose.model('Currior',curriorSchema);
module.exports = Currior;