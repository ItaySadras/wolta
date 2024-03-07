const cors = require("cors");
const express = require("express"); // Express.js web application framework

const app = express();
app.use(express.json());
app.use(cors());

const customerRoutes = require("./roots/routes/customerRoutes");
const courierRoutes = require("./roots/routes/courierRoute");
const restaurantRoute = require("./roots/routes/restaurantRoute");
const reviewRoute = require("./roots/routes/reviewRoute");

app.use("/api/customer", customerRoutes);
app.use("/api/courier", courierRoutes);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/review", reviewRoute);

// Export the app to be used by the server
module.exports = app;
