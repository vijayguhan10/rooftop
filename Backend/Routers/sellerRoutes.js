const express = require("express");
const router = express.Router();
const SellVegetables = require("../Controller/SellvegetablesController");
const emailcotroller = require("../Controller/EmailController");

router.post("/sell", SellVegetables.sellVegetables);

router.post("/emailtocommonroute", emailcotroller.emailparser);

module.exports = router;
