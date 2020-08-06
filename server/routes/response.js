const router = require('express').Router();
const Form = require('../models/form');
const Response = require('../models/response');

router.post('/:shortid', async (req, res) => {
  const shortid = req.params.shortid;
  try {
    req.body.user = req.user.id;
    req.body.form = (await Form.findOne({ shortid })).id;

    const { user, form, fields } = req.body;

    const newResponse = {
      user,
      form,
      fields,
    };

    const response = await Response.create(newResponse);

    res.status(201).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
