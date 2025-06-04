
const { show, orderSlug } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();


router.get("/:slug", show);
router.get("/:id", orderSlug);


module.exports = router;