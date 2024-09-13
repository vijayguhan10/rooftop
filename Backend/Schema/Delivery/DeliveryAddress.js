const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "delivery addresses",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  address: {
    type: String,
    require: true,
  },
  IncommingHistory: [
    {
      ProductDetail: {
        type: mongoose.Types.ObjectId,
        ref: "sellvegetables",
      },
      CostumerOrderDetail: {
        type: mongoose.Types.ObjectId,
        ref: "addresses",
      },
      status: {
        type: String,
        enum: ["pending", "declined", "delivered", "confirmed"],
        default: "pending",
      },
    },
  ],
  OutGoingHistory: [
    {
      ProductDetail: {
        type: mongoose.Types.ObjectId,
        ref: "sellvegetables",
      },
      CostumerOrderDetail: {
        type: mongoose.Types.ObjectId,
        ref: "addresses",
      },
      status: {
        type: String,
        enum: ["pending", "declined", "delivered", "confirmed"],
        default: "pending",
      },
    },
  ],
});

userSchema.index({ location: "2dsphere" });

const DeliveryAddress = mongoose.model("delivery addresses", userSchema);

module.exports = DeliveryAddress;
