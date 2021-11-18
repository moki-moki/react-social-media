const router = require("express").Router();
const { getUser } = require("../controller/user");

router.get("/", getUser);

module.exports = router;
