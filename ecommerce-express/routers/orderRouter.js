
const { index, show, customerStore, customerPatch } = require("../controllers/orderController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", customerStore);
router.patch("/", customerPatch);

module.exports = router;