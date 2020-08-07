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
const { ensureAuthenticated, ensureGuest } = require('./middleware/auth');

const app = express();

connectDB();
initializePassport(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { SESSION_SECRET, NODE_ENV, PORT } = process.env;

if (NODE_ENV !== 'production') {
  require('dotenv').config();
  app.use(morgan('dev'));
  app.use(cors());
}

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    cookie: {
      httpOnly: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/response', require('./routes/response'));
app.use('/api/forms', require('./routes/form'));
app.use('/api/register', ensureGuest, require('./routes/register'));
app.use('/api/login', ensureGuest, require('./routes/login'));
app.use('/api/user/me', ensureAuthenticated, require('./routes/user'));

app.delete('/api/logout', ensureAuthenticated, (req, res) => {
  req.logout();
  res.send({
    message: 'Logged out',
  });
});

//todo Remove from production
app.get('/api', ensureAuthenticated, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
