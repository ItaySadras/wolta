const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController");

router.get("/userSearched",filterController.TheGreatFilter);
router.get("/getDictionary",filterController.getDictionary);
module.exports = router;
