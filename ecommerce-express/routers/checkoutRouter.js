
const {  checkoutProcess, indexDiscountCode } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();


router.get("/discount-code", indexDiscountCode);
module.exports = router;