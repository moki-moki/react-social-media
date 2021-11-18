const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// register
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;

  // creating a user
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password"), 400);
  }

  try {
    // Searches for user by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Credentials"), 401);
    }
    // method that finds password and compares is
    const match = await user.matchPasswords(password);

    if (!match) {
      return next(new ErrorResponse("Invalid Cuedentials"), 401);
    }

    // res.status(200).json(user);
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, user });
};
