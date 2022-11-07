const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// static signup method
userSchema.statics.signup = async function (
  userName,
  email,
  password,
  confirmPassword
) {
  //validation
  if (password !== confirmPassword) {
    throw Error('Your password and confirmation password do not match!');
  }

  // this refers to userSchema
  const exists = await this.findOne({ email });

  // to check if the signup email already pre-existed in the database
  if (exists) {
    throw Error('Email is already in use!');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ userName, email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error('All fields must be filled!');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Incorrect email!');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect password!');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
