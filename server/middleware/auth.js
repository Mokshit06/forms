const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res
    .status(400)
    .json({ message: 'You need to log in before accessing this page' });
};

const ensureGuest = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.json({
      message: 'You are already logged in',
    });
  }

  next();
};

module.exports = {
  ensureAuthenticated,
  ensureGuest,
};
