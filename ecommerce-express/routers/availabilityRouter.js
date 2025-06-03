const express = require("express");
const router = express.Router();
const { getProductAvailability, checkProductAvailability, checkCartAvailability, processOrder } = require("../controllers/availabilityController");

router.get("/product/:productId/availability", getProductAvailability);

router.get("/check/:productId/:size", checkProductAvailability);

router.post("/check-cart", checkCartAvailability);

router.post("/process-order", processOrder);

module.exports = router;
