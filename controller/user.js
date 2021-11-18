const User = require("../models/User");

// GET A USER
exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.find({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    console.log(user);

    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};
