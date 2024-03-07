const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");


// router.patch(restaurantController.updateRestaurant)
router.get("/getAllRestaurant",restaurantController.getAllRestaurants);
router.get("/:restaurantId", restaurantController.getRestaurantById);

router.post(restaurantController.createRestaurant)



// router.post('/createRestaurant', restaurantController.createRestaurant);
// edit opening hours
// edit location
// set kosher status
// set open/closed right now
// add dish to menu
// add review
// get menu
// get all reviews
// delete dish
// edit dish

module.exports = router;
