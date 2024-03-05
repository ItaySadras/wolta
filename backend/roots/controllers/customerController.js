const Customer = require('../models/customerModel');

exports.createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.addAddress = async (req, res) => {
  const { customerId, address } = req.body;
  try {
    const customer = await Customer.findById(customerId);
    customer.addresses.push(address);
    await customer.save();
    res.status(200).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
};


