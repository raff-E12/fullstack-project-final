
const { index, show, indexProductCategory, indexBestSellers } = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/bestsellers", indexBestSellers )
router.get("/category/:categorySlug", indexProductCategory);
router.get("/", index);
router.get("/:slug", show);





module.exports = router;