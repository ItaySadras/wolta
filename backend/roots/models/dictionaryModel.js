const mongoose = require("mongoose");
const dictionarySchema = new mongoose.Schema({
  dishes: [
    {
      name: { type: String },
      type: { type: String },
      dishId: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
    },
  ],

  restaurant: [
    {
      name: { type: String },
      type: { type: String },
      restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }    },
  ],
});

const Dictionary = mongoose.model("Dictionary", dictionarySchema);

module.exports = Dictionary;
