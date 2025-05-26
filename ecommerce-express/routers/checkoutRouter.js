
const {  checkoutProcess, customerPatch } = require("../controllers/orderController");
const validationCheckoutProcess = require("../middlewares/validationCheckoutProcess");
const validationCustomerUpdate = require("../middlewares/validationCustomerUpdate");
const express = require("express");
const router = express.Router();


router.post("/", validationCheckoutProcess, checkoutProcess);
router.patch("/", validationCustomerUpdate, customerPatch);

module.exports = router;