const router = require('express').Router();
const Form = require('../models/form');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    req.body.user = req.user.id;
    const { user, fields, title } = req.body;
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

router.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    const forms = await Form.find({ user: req.user.id });
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

router.delete('/:shortid', ensureAuthenticated, async (req, res, next) => {
  const shortid = req.params.shortid;
  try {
    const form = await Form.deleteOne({ shortid, user: req.user.id });

    if (!form) {
      return res.status(404).send({ message: 'Form not found' });
    }

    res.send({ message: `${form.title} deleted` });
  } catch (err) {
    next('Something went wrong');
  }
});

module.exports = router;
