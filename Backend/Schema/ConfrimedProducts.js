const mongoose = require("mongoose");

const ConfrimedSchema = new mongoose.Schema({
  ProductId: {
    require: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellvegetables",
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  TotalQuantity: {
    require: true,
    type: Number,
  },
});

ConfrimedSchema.index({ location: "2dsphere" });

const Confirmed = mongoose.model("confrimedProducts", ConfrimedSchema);
module.exports = Confirmed;
