const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const dishController = require("../controllers/dishController");
const menuCategoryController = require("../controllers/menuCategoryController");
const userController = require("../controllers/userController");
const filterController = require("../controllers/filterController");

// router.use(userController.authenticateRestaurant);

router.get("/:restaurantId", restaurantController.getRestaurantById);
/**
 * ! direct restuarnt method
 */

// create a new restaurant it is imposable to create reviews\menuCategory or any other ref through here
// req example http://localhost:8000/api/restaurant/createRestaurant
router.post("/createRestaurant", restaurantController.createRestaurant);

// update one of restaurants fields of course only primitive one
// req example http://localhost:8000/api/restaurant/updateRestaurant/65e81be88630ba788c71bbca
router.patch(
  "/updateRestaurant/:restaurantId",
  restaurantController.restaurantUpdater
);

/**
 * !dishes operations
 */
// create a new dish by details sent in the body get the menuCategoryId from params
// req example http://localhost:8000/api/restaurant/createDish/65e81be88630ba788c71bbca
router.post("/createDish/:menuCategoryId", dishController.createDish);

// delete  a requsted dish in all the relevant places
// req example http://localhost:8000/api/restaurant/deleteDish/65e81be88630ba788c71bbca
router.delete("/deleteDish/:dishId", dishController.delateDish);

// params= your wanted dishId,query only needed for modifying an array  req.query.action=remove/add
// in the body you send the key you want to update and the value you want to update
// req.example http://localhost:8000/api/restaurant/updateDish/65e81b898630ba788c71bb5c?action=add/remove,body:{ingredients:baanna}
router.patch("/updateDish/:dishId", dishController.dishUpdater);

/**
 * !menu category operations
 */
// delete a menu category by a requested Id
// req example http://localhost:8000/api/restaurant/:deleteMenuCategory/65e81b848630ba788c71bb5a
router.delete(
  "/deleteMenuCategory/:menuCategoryId",
  menuCategoryController.deleteMenuCategory
);

// create anew menu category access the relevant menu throw the params and get the name of the new category from the body
// req example http://localhost:8000/api/restaurant/createMenuCategory/65e81b848630ba788c71bb5a
router.post(
  "/createMenuCategory/:menuId",
  menuCategoryController.createMenuCategory
);

// change only menu category name because its the only primitive key
// req example http://localhost:8000/api/restaurant/changeMenuCategoryName/65e81b848630ba788c71bb5a
router.patch(
  "/changeMenuCategoryName/:menuCategoryId",
  menuCategoryController.changeName
);

// chenge the order of a menu category get from the body an array of the new orderIds
router.patch(
  "/changeMenuCategoryOrder/:menuCategoryId",
  menuCategoryController.changeOrder
);
module.exports = router;
