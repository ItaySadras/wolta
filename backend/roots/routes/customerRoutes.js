const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const filterController = require('../controllers/filterController');
const reviewController = require('../controllers/reviewController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');
const dishController = require('../controllers/dishController');
const restaurantController = require('../controllers/restaurantController');


router.use(userController.authenticateCustomer)
// get up to 30 relevant dishes and restaurant by search
router.get("/:searched",filterController.createSearchCookie,filterController.TheGreatFilter)
router.get("/getAllRestaurant", filterController.getsSearchPreferencesFromCookies,filterController.TheGreatFilter);
// get a a specific restaurant by id
router.get("/getRestaurantById/:restaurantId", restaurantController.getRestaurantById);


router.get('/getCustomerDetails/:customerId',customerController.getCustomerById);


// acsses the rlevent resturent throw the params
router.post('/createReview/:restaurantId',reviewController.createReview)
// gets the populated restaurant of a specific dish
router.get('/getDishRestaurant/:dishId',dishController.getDishRestaurant)

router.put('/updateDetails/:customerId', customerController.UpdateCustomerDetails)

router.route('/createOrder').post(orderController.createOrder)
router.route('/createCustomerAddress').post(customerController.createCustomerAddress)



module.exports = router;
