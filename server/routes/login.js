const router = require('express').Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
  passport.authenticate('local', (err, user, message) => {
    if (err) {
      return next('Something went wrong');
    }

    if (!user) {
      return res.status(404).json({ message });
    }

    req.login(user, err => {
      if (err) {
        return next('Something went wrong');
      }
      res.send({ message: 'Logged in' });
    });
  })(req, res, next);
});

module.exports = router;
