
const {  checkoutProcess, customerPatch } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

router.post("/", checkoutProcess);
router.patch("/", customerPatch);

module.exports = router;