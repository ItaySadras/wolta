const express = require('express');
const router = express.Router();
const curriorController = require('../controllers/curriorController');

router.post('/', curriorController.createCurrior);
// router.patch('/vehicle', curriorController.setVehicle);
router.patch('/rating', curriorController.setRating);
router.patch('/available', curriorController.setAvailable);


module.exports = router;