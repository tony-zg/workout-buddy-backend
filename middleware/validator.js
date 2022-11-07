const { check, validationResult } = require('express-validator');

exports.validateUser = [
  check('userName')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Username is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be 3 to 20 characters long!'),
  check('email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is missing!')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password must be 6 to 15 characters long!'),
  check('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Confirm Password is missing!')
    .isLength({ min: 6, max: 15 })
    .withMessage('Confirm Password must be 6 to 15 characters long!')
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(400).json({ error: error[0].msg });
};
