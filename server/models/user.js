const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please enter a name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    lowercase: [true, 'Email should be in lowercase'],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    trim: true,
  },
});

userSchema.plugin(uniqueValidator, { message: '{VALUE} is already in use' });

const User = mongoose.model('User', userSchema);

module.exports = User;
