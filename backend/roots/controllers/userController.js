const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const Restaurant = require("../models/restaurantModel");
const Courier = require("../models/courierModel");
secret = "secretkey";

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password, type } = req.body;

    const hashedPassword = await ReturnHashedPassword(password);

    switch (type) {
      case "customer":
        const isCustomer = await Customer.findOne({ email: email });
        if (isCustomer) {
          return res.status(401).send({ message: "Customer already exists" });
        }
        req.mySchemaInstance = await Customer.create({
          username,
          email,
          password: hashedPassword,
        });
        break;
      case "restaurant":
        const isRestaurant = await Restaurant.findOne({ email: email });
        if (isRestaurant) {
          return res.status(401).send({ message: "Restaurant already exists" });
        }
        req.mySchemaInstance = await Restaurant.create({
          username,
          email,
          password: hashedPassword,
        });
        break;
      case "courier":
        const isRCourier = await Courier.findOne({ email: email });
        if (isRCourier) {
          return res.status(401).send({ message: "Courier already exists" });
        }
        req.mySchemaInstance = await Courier.create({
          username,
          email,
          password: hashedPassword,
        });
        break;
      default:
        return res.status(400).send({
          status: "type is invalid",
          message: "Invalid user type",
        });
    }
    next();
  } catch (err) {
    res.status(500).send({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.logInUser = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    const user = await validateUserByType(email, type);
    if (!user || !bcrypt.compare(password, user.password)) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    } else {
      const token = jwt.sign({ userId: user._id, type: type }, secret, {
        expiresIn: "1h",
      });
      res.cookie("ui", token, {
        httpOnly: true,
        maxAge: 60000,
        sameSite: "strict",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "internal server error",
      message: error.message,
    });
  }
};

exports.authenticateRestaurant = async (req, res, next) => {
  try {
    if (!req.cookies.ui) {
      return res
        .status(401)
        .send({ status: "fail", message: "no token provided" });
    } else {
      const { userId, type } = jwt.verify(req.cookies.ui, secret);
      if (type === "restaurant") {
        const restaurant = await Restaurant.findById(userId);
        if (!restaurant) {
          return res
            .status(401)
            .send({ status: "fail", message: "this restaurant doesn't exist" });
        }
        next();
      } else {
        return res
          .status(401)
          .send({ status: "fail", message: "not a restaurant" });
      }
    }
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.authenticateCustomer = async (req, res, next) => {
  try {
    if (!req.cookies.ui) {
      return res
        .status(401)
        .send({ status: "fail", message: "no token provided" });
    } else {
      const { userId, type } = jwt.verify(req.cookies.ui, secret);
      if (type !== "customer") {
        return res
          .status(401)
          .send({ status: "fail", message: "not a customer" });
      }

      const customer = await Customer.findById(userId);
      if (!customer) {
        return res
          .status(401)
          .send({ status: "fail", message: "Customer does not exist" });
      }

      req.customer = customer;
      next();
    }
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

exports.authenticateCourier = async (req, res, next) => {
  try {
    if (!req.cookies.ui) {
      return res
        .status(401)
        .send({ status: "fail", message: "no token provided" });
    } else {
      const { userId, type } = jwt.verify(req.cookies.ui, secret);
      if (type !== "courier") {
        return res
          .status(401)
          .send({ status: "fail", message: "not a courier" });
      }

      const courier = await Courier.findById(userId);
      if (!courier) {
        return res
          .status(401)
          .send({ status: "fail", message: "Courier does not exist" });
      }

      req.courier = courier;
      next();
    }
  } catch (error) {
    res.status(500).send({ status: "fail", message: error.message });
  }
};

const ReturnHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const validateUserByType = async (email, type) => {
  let user;
  switch (type) {
    case "customer":
      user = await Customer.findOne({ email });
      break;
    case "restaurant":
      user = await Restaurant.findOne({ email });
      break;
    case "courier":
      user = await Courier.findOne({ email });
      break;
    default:
      user = null;
  }
  return user;
};
