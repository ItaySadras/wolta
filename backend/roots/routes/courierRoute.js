const express = require('express');
const router = express.Router();
const courierController = require('../controllers/courierController');
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');

// router.use(userController.authenticateCourier)

// router.patch('/vehicle', courierController.setVehicle);
router.patch('/rating/:id', courierController.setRating);
router.patch('/available/:id', courierController.setAvailable);
// router.patch('/currOrder/:id', courierController.setCurrOrder);
router.post('/',courierController.createCourier);
// except an order Id and delete it from all the relevant places 
router.delete('/deleteOrder/:orderId', orderController.deleteOrder);

module.exports = router
