const Restaurant = require("../models/restaurantModel")

exports.createRestaurant = async (req, res) => {
    try {
        const { userName, password, email, phoneNumber } = req.body;
        const newRestaurant = new Restaurant({
            userName,
            password,
            email,
            phoneNumber
        })
        await newRestaurant.save();
        res
            .status(201)
            .json({ message: "Restaurant created successfully", restaurant: newRestaurant });

    } catch (error) {
        res.status(404).json({
            status: failed,
            message: error.message
        })
    }
}


