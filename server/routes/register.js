const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { sendWelcomeEmail } = require('../email/email');

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword };

    const user = await User.create(newUser);

    sendWelcomeEmail({
      email: user.email,
      name: user.name,
    });

    req.login(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(201).send(user);
    });
  } catch (error) {
    // console.log('error', JSON.parse(JSON.stringify(error.errors)));
    // console.log('error', error.errors.email);
    res.status(400).json({
      message: error.errors[Object.keys(error.errors)[0]].properties.message,
    });
  }
});

module.exports = router;
