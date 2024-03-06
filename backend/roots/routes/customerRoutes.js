const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.route('/getAllCustomers').get(customerController.getAllCustomers)
router.route('/create').get(customerController.createCustomer)
router.route('/login').get(customerController.loginCustomer)
// router.route('/logout').get(customerController.)


module.exports = router;
