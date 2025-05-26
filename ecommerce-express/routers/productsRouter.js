
const { index, show, showProductCategory } = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.get("/category/:categoryId", showProductCategory);



module.exports = router;