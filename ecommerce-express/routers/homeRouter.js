
const { indexHome } = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/", indexHome);


module.exports = router;