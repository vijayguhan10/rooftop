const express = require("express");
const router = express.Router();
const DeliveryCredential = require("../Controller/delivery/Authentication");
const DeliveryAddress = require("../Controller/delivery/DeliveryAddress");
const UpdateDeliveryManStatus = require("../Controller/updateOrders");

// Delivery Man Authentication
router.post("/Signup", DeliveryCredential.registration);
router.post("/login", DeliveryCredential.login);

// Delivery Man Address
router.post("/NewAddress", DeliveryAddress.NewAddress);
router.put("/UpdateAddress", DeliveryAddress.UpdateMyDetails);
router.post("/GetData", DeliveryAddress.GetData);

// Updating Pickup Status
router.put("/status/confrim_order", UpdateDeliveryManStatus.updatetoConfrim);
router.put("/status/declineorder", UpdateDeliveryManStatus.OrderDeclination);

module.exports = router;
