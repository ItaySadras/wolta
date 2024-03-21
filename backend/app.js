const express = require("express");

const app = express();

app.use(express.json());
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173","http://localhost:5174"],
  credentials: true,
};
app.use(cors(corsOptions));

const customerRoutes = require("./roots/routes/customerRoutes");
const courierRoutes = require("./roots/routes/courierRoute");
const adminRoute = require("./roots/routes/adminRoute");
const restaurantRoute = require("./roots/routes/restaurantRoute");
const userController = require("./roots/controllers/userController");

// router.route('/create').get(customerController.createCustomer)
// router.route('/login').get(customerController.loginCustomer

/**
 * !send the type of user you want to register/login in the body type:customer
 */
app.use("/registerUser", userController.registerUser);
app.use("/logInUser", userController.logInUser);


app.use("/api/customer", customerRoutes);
app.use("/api/courier", courierRoutes);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/admin", adminRoute);



// Export the app to be used by the server
module.exports = app;
