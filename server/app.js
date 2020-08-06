const express = require('express');
const connectDB = require('./config/mongoose');
const User = require('./models/user');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const initializePassport = require('./config/passport');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

connectDB();
initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  app.use(morgan('dev'));
  app.use(cors());
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/register', require('./routes/register'));

app.post('/api/login', (req, res, next) => {
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
      res.send('Logged in');
    });
  })(req, res, next);
});

//todo Remove from production
app.get('/api', async (req, res) => {
  console.log('Loading...');
  const users = await User.find({});
  res.send(users);
});

app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
