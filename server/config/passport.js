const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const initialize = passport => {
  const authenticate = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, {
          message: 'No user with that email',
        });
      }

      const passwordIsSame = await bcrypt.compare(password, user.password);

      if (!passwordIsSame) {
        return done(null, false, {
          message: 'Password is incorrect',
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      authenticate
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {});
};

module.exports = initialize;
