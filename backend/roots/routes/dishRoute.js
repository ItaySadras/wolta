const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dishController");
const { getDish } = require("../controllers/dishController");

router.post("/:menuCategoryId", dishController.createDish);
router.get("/menu-category/:menuCategoryId/dish/:dishId", getDish);
router.delete(dishController.deleteDish);
module.exports = router;
