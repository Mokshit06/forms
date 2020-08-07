const router = require('express').Router();
const Form = require('../models/form');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    req.body.user = req.user.id;
    const { user, fields, title } = req.body;
    console.log(fields);
    const newForm = {
      user,
      fields,
      title,
    };

    const form = await Form.create(newForm);

    res.status(201).send(form);
  } catch (error) {
    res.status(400).json({
      message: error.errors[Object.keys(error.errors)].properties.message,
    });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const forms = await Form.find({ user: req.user.id });
    // console.log(forms);
    res.send(forms);
  } catch (error) {
    next('Something went wrong');
  }
});

router.get('/:shortid', async (req, res, next) => {
  const shortid = req.params.shortid;
  try {
    const form = await Form.findOne({ shortid }).populate({
      path: 'user',
    });

    if (!form) {
      return res.status(404).send({ message: 'Form not found' });
    }

    res.send(form);
  } catch (error) {
    next('Something went wrong');
  }
});

module.exports = router;
