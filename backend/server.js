const mongoose = require("mongoose");
const dotenv = require("dotenv");
// Configure dotenv
dotenv.config({ path: "./.env" });
// Connection to the database
mongoose
  .connect(process.env.MONGOURL, {
    connectTimeoutMS: 10000000,
    socketTimeoutMS: 10000000,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const app = require("./app");
const searchAlgorithm = require("./backEndUtils/searchBackend");
const { createDB, addsDesertsAndAppetizers, generateRestaurantsImages, generateRestaurantsAddress } = require("./backEndUtils/dataBaseBuilder");
app.listen(8000, () => console.log(`Dev Server is Running 8000`));

// generateRestaurantsImages()
