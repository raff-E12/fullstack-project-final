
const { index, store, show } = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.post("/", store);
router.get("/:id", show);


module.exports = router;