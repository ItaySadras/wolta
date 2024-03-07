const { decode } = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Customer = require('../models/customerModel');


exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).send(customers);
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.createCustomer = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hashedPassword);
    const {username, password, phoneNumber } = req.body;
    const newCustomer = await Customer.create({
      username,
      password: hashedPassword,
      phoneNumber
    })
    res.send(newCustomer)
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginCustomer = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(400).send(error);
  }
}

exports.logoutCustomer = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
    })
    console.log("logged out");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message)
  }
}

