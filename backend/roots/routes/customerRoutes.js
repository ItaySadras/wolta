const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/customer',customerController.createCustomer);
router.put('/customer/address',customerController.addAddress);


module.exports = router;
