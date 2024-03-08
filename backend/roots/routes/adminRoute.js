const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const filterController = require('../controllers/filterController');


router.route('/:searched').get(filterController.TheGreatFilter)


module.exports = router;
