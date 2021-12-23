const router = require("express").Router();
const { editUsersProfile } = require("../controller/user");
const { getUser } = require("../controller/user");

router.get("/", getUser);

// Edit profile
router.put("/edit", editUsersProfile);

module.exports = router;
