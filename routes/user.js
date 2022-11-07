const express = require('express');

// controller functions
const { loginUser, signupUser } = require('../controllers/userController');

// middleware
const { validateUser, validate } = require('../middleware/validator');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', validateUser, validate, signupUser);

module.exports = router;
