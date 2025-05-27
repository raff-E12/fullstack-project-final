
const { index, show, indexProductCategory } = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.get("/:slug", show);
router.get("/category/:categorySlug", indexProductCategory);



module.exports = router;