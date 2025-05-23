
const { index, show, customerStore } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", customerStore);

module.exports = router;