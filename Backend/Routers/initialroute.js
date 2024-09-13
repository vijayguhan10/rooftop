const express = require("express");
const router = express.Router();
const authController = require("../Controller/authentication");
const AddressController = require("../Controller/AddressController");

//DELIVERY MAN INPUT FUNCTIONAL FILES APPLICATIONS

const DeliveryCredential = require("../Controller/delivery/Authentication");
const DeliveryAddress = require("../Controller/delivery/DeliveryAddress");

//PERSON OR THE SELLER WHO SELLS THE VEGETABLES FUNCTIONAL FILES APPLICATIONS

const SellVegetables = require("../Controller/SellvegetablesController");

//UPDATING THE DELIVERYMANS STATUS ORDER STATUS FUNCTIONAL FILES AND APPLICATIONS
const UpdateDeliveryManStatus = require("../Controller/updateOrders");
const emailcotroller = require("../Controller/EmailController");
//CONTROLLER FOR THE USERS
console.log("ADDRESSCONTROLLER", AddressController);
router.post("/authentication/register", authController.registration);
router.post("/authentication/login", authController.login);
router.post("/Address/newuser", AddressController.NewAddress);
router.post("/Address/fetchAddress", AddressController.GetData);
router.put("/Address/UpdateAddress", AddressController.UpdateMyDetails);

//DELIVERY MANS ROUTER FUNCTIONS

router.post("/delivery/Signup", DeliveryCredential.registration);
router.post("/delivery/login", DeliveryCredential.login);
router.post("/delivery/NewAddress", DeliveryAddress.NewAddress);
router.put("/delivery/UpdateAddress", DeliveryAddress.UpdateMyDetails);
router.post("/delivery/GetData", DeliveryAddress.GetData);

//SELLER DETAILS VEGETABLES FROM TERRACE

router.post("/vegetables/sell", SellVegetables.sellVegetables);
//UPDATING THE PICKUP STATUS OF THE DELIVERYMANS
router.put(
  "/deliveryUpdate/status/confrim_order",
  UpdateDeliveryManStatus.updatetoConfrim
);
router.put(
  "/deliveryUpdate/status/declineorder",
  UpdateDeliveryManStatus.OrderDeclination
);
//EMAIL BODY  PARSER
router.post("/emialtocommonroute", emailcotroller.emailparser);
module.exports = router;
