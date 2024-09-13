const mongoose = require("mongoose");
const SellVegetablesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
    required: true,
  },
  vegetablename: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    max: [8, "Quantity cannot be more than 8"],
  },
});

const SellVegetables = mongoose.model("SellVegetables", SellVegetablesSchema);
module.exports = SellVegetables;
