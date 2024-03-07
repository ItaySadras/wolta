const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const filterController = require('../controllers/filterController');
const reviewController = require('../controllers/reviewController');
const orderController = require('../controllers/orderController');

router.route('/getAllCustomers').get(customerController.getAllCustomers)
router.route('/create').get(customerController.createCustomer)
router.route('/login').get(customerController.loginCustomer)
router.route('/createReview').get(reviewController.createReview)
router.route('/getDictionary').get(filterController.getDictionary)
// router.route('/logout').get(customerController.)


module.exports = router;
