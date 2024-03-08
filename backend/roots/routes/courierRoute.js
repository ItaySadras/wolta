const express = require('express');
const router = express.Router();
const courierController = require('../controllers/courierController');
const userController = require('../controllers/userController');


router.use(userController.authenticateCourier)

// router.patch('/vehicle', courierController.setVehicle);
router.patch('/rating/:id', courierController.setRating);
router.patch('/available/:id', courierController.setAvailable);
router.patch('currOrder/:id', courierController.setCurrOrder);


module.exports = router
