const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const Form = require('./form');

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

userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;
  delete user.__v;

  return user;
};

userSchema.pre('remove', async function () {
  const forms = await Form.find({ user: this.id });

  for (let index in forms) {
    await forms[index].remove();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
