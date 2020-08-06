const { sendCancelationEmail } = require('../email/email');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send(req.user);
});

router.delete('/', async (req, res) => {
  try {
    await req.user.remove();

    sendCancelationEmail({
      email: req.user.email,
      name: req.user.name,
    });

    res.send({ message: 'User deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
