const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/helper');

// pass in _id argument as part of jwt payload
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a jwt token
    const token = createToken(user._id);

    const { userName } = user;

    res.status(200).json({ userName, token });
  } catch (error) {
    sendError(res, error.message);
  }
};

// signup user
const signupUser = async function (req, res) {
  const { userName, email, password, confirmPassword } = req.body;

  try {
    const user = await User.signup(userName, email, password, confirmPassword);

    // create a jwt token
    const token = createToken(user._id);

    res.status(200).json({ userName, email, token });
  } catch (error) {
    sendError(res, error.message);
  }
};

module.exports = {
  loginUser,
  signupUser
};
