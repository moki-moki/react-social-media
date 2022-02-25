const User = require("../models/User");

// GET A USER
exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.find({ username: username });
    const { password, updatedAt, ...other } = user._doc;

    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Edit users profile (username)
exports.editUsersProfile = async (req, res) => {
  const newName = req.body.username;
  const id = req.params.id;
  if (req.body.username !== null) {
    try {
      let user = await User.findById(id);
      user.username = newName;
      console.log(newName);
      console.log(user);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
