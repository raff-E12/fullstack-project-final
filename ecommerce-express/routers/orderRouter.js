
const { show } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();


router.get("/:slug", show);


module.exports = router;