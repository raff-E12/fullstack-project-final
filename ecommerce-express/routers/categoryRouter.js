
const { index, show } = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

router.get("/", index);
router.get("/:slug", show);


module.exports = router;