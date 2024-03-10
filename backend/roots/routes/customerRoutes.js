const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const filterController = require('../controllers/filterController');
const reviewController = require('../controllers/reviewController');
const orderController = require('../controllers/orderController');
const userController = require('../controllers/userController');


// get up to 30 relevant dishes and restaurant by search
router.get("/:searched",filterController.createSearchCookie,filterController.TheGreatFilter)


router.get('/getCustomerDetails/:customerId',customerController.getCustomerById);


// router.use(userController.authenticateCustomer)
// acsses the rlevent resturent throw the params
router.post('/createReview/:restaurantId',reviewController.createReview)
// router.route('/logout').get(customerController.)
router.put('/updateDetails/:customerId', customerController.UpdateCustomerDetails)

router.route('/creteOrder/:').post(orderController.createOrder)

module.exports = router;
