
const { index, show, update } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.patch("/:id", update)


module.exports = router;