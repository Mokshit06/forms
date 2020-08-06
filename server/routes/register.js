const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { name, email, password: hashedPassword };

    await User.create(newUser);
    res.status(201).send();
  } catch (error) {
    res.status(400).json({
      message: error.errors[Object.keys(error.errors)].properties.message,
    });
  }
});

module.exports = router;
