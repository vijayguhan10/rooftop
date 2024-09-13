const express = require("express");
const router = express.Router();
const AddressController = require("../Controller/AddressController");

router.post("/newuser", AddressController.NewAddress);
router.post("/fetchAddress", AddressController.GetData);
router.put("/UpdateAddress", AddressController.UpdateMyDetails);

module.exports = router;
