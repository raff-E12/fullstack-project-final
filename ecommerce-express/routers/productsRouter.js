
const { index, show, indexProductCategory } = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.get("/category/:categoryId", indexProductCategory);



module.exports = router;