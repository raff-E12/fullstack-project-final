
const {  checkoutProcess } = require("../controllers/orderController");
const validationCheckoutProcess = require("../middlewares/validationCheckoutProcess");
const validationCustomerUpdate = require("../middlewares/validationCustomerUpdate");
const express = require("express");
const router = express.Router();


router.post("/", validationCheckoutProcess, checkoutProcess);

module.exports = router;