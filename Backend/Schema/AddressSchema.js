const mongoose = require("mongoose");
const SellVegetables = require("./SellVegetablesSchema");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AddressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "signups",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, "Please enter a valid email address"],
  },
  phonenumber: {
    type: String,
    required: true,
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
  address: {
    type: String,
  },
  SoldHistory: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SellVegetables",
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "successful"],
        default: "pending",
      },
    },
  ],
  otpVerification: [
    {
      expiresAt: { type: Date },
      isVerified: { type: Boolean, default: false },
    },
  ],

  BoughtHistory: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SellVegetables",
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "successful"],
        default: "pending",
      },
    },
  ],
});

AddressSchema.index({ location: "2dsphere" });

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
