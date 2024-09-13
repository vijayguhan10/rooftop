const router = require("express").Router();
const fidnproducts = require("../Controller/Ecommerce/FilterProducts");
router.post("/findProducts", fidnproducts.FilterByLocation);
module.exports = router;
