const controller = require("../controllers/controller");

const express = require("express");
const router = express.Router();

router.get("/", controller.index);
router.post("/", controller.store);
router.get("/:id", controller.show);


module.exports = router;