const Dictionary = require("../models/dictionaryModel");

exports.getDictionary = async (req, res) => {
  try {
    const dictionary = await Dictionary.find({});
    res.status(200).send({dictionary:dictionary})
  } catch (error) {
    res.status(500).send({Message:"fail"})

  }
};

exports.TheGreatFilter = async (req, res) => {};
