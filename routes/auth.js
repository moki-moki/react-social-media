const router = require("express").Router();
const User = require("../models/User");

const { register, login } = require("../controller/auth");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //Saving user and responding
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
