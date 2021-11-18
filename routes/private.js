const router = require("express").Router();
const { getPrivateData } = require("../controller/private");
const { protect } = require("../middleware/auth");

router.get("/", protect, getPrivateData);

module.exports = router;
