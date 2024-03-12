const { decode } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Customer = require("../models/customerModel");
const Address = require("../models/addressModel");
const { reverseGeocode } = require("../../backEndUtils/helpers");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.status(200).send(customers);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.createCustomerAddress = async(req,res) =>{
  try {
  const { customerId,latitude, longitude } = req.body;
  const customer= await Customer.findById(customerId);
  if (latitude && longitude) {
    const address = await reverseGeocode(latitude, longitude);
    console.log("🚀 ~ exports.createCustomerAddress=async ~ address:", address)
    if (address) {
      // Create a new Address instance using the address data
      console.log("🚀 ~ exports.setAvailable= ~ streetNumber:", typeof address.streetNumber)
      const newAddress = await Address.create({
        streetName: address.streetName,
        streetNumber: address.streetNumber,
        city: address.city,
        country: address.country,
      });
      await newAddress.save(); // Save the new address to the database
      customer.addresses.push(newAddress) ; // Assign the new address to the customer
    }
  }
  await customer.save();
  res
      .status(200)
      .send({ message: "Customer address created successfully", customerAddresses: customer.addresses[0] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};


exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId).populate('addresses');

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    res.status(500).json({ message: "Error fetching customer details" });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(hashedPassword);
    const { username, password, phoneNumber } = req.body;
    const newCustomer = await Customer.create({
      username,
      password: hashedPassword,
      phoneNumber,
    });
    res.send(newCustomer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.loginCustomer = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logoutCustomer = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
    });
    console.log("logged out");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error.message);
  }
};


exports.UpdateCustomerDetails = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.customerId, req.body ,{ new: true }); 
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
     return res.status(200).json({customer:updatedCustomer});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


