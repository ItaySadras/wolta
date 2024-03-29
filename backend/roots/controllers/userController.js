const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const Restaurant = require("../models/restaurantModel");
const Courier = require("../models/courierModel");
secret = "secretkey";

exports.registerUser = async (req, res, next) => {
  try {
    let mySchemaInstance
    const { username, email, password, accountType,phoneNumber } = req.body;
    console.log(req.body);

    const hashedPassword = await ReturnHashedPassword(password);

    switch (accountType) {
      case "customer":
        const isCustomer = await Customer.findOne({ email: email });
        if (isCustomer) {
          return res.status(401).send({ message: "Customer already exists" });
        }
        mySchemaInstance = await Customer.create({
          name:username,
          email,
          password: hashedPassword,
          phoneNumber
        });
        res.status(200).send({user:mySchemaInstance})
        break;
      case "restaurant":
        const isRestaurant = await Restaurant.findOne({ email: email });
        if (isRestaurant) {
          return res.status(401).send({ message: "Restaurant already exists" });
        }
        mySchemaInstance = await Restaurant.create({
          username,
          email,
          password: hashedPassword,
          phoneNumber
        });
        res.status(200).send({user:mySchemaInstance})
        break;
      case "courier":
        const isRCourier = await Courier.findOne({ email: email });
        if (isRCourier) {
          return res.status(401).send({ message: "Courier already exists" });
        }
        mySchemaInstance = await Courier.create({
          userName:username,
          email,
          password: hashedPassword,
          phoneNumber
        });
        res.status(200).send({user:mySchemaInstance})
        break;
      default:
        return res.status(400).send({
          status: "type is invalid",
          message: "Invalid user type",
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "internal server error",
      message: err.message,
    });
  }
};

exports.logInUser = async (req, res) => {
  try {
    const { email, password, accountType } = req.body;
    const user = await validateUserByType(email, accountType);
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).send({
        status: "fail",
        message: "Incorrect email or password",
      });
    } else {
      const token = jwt.sign({ userId: user._id, type: accountType }, secret, {
        expiresIn: "1h",
      });
      res.cookie("ui", token, {
        httpOnly: true,
        maxAge: 60000000,
        sameSite: "strict",
      });
    }
    res.status(200).send({[accountType]:user,accountType:accountType})
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
  console.log("🚀 ~ ReturnHashedPassword ~ password:", password)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("🚀 ~ ReturnHashedPassword ~ hashedPassword:", hashedPassword)
  return hashedPassword;
};

const createSocketIdByType = async (type) => {
  try {
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

    
  } catch (error) {
    
  }

}
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
