const router = require('express').Router();
const Form = require('../models/form');
const { ensureAuthenticated, ensureGuest } = require('../middleware/auth');

router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    req.body.user = req.user.id;
    const { user, fields } = req.body;
    const newForm = {
      user,
      fields,
    };

    const form = await Form.create(newForm);

    res.status(201).send(form);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

router.get('/:shortid', async (req, res) => {
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
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
