const router = require('express').Router();
const Form = require('../models/form');
const Response = require('../models/response');
const { sendResponseEmail } = require('../email/email');

router.post('/:shortid', async (req, res) => {
  const shortid = req.params.shortid;
  try {
    const form = await Form.findOne({ shortid }).populate('user');

    if (!form) {
      return res.status(404).send({ message: 'Form not found' });
    }

    const { respondee, fields } = req.body;

    fields.forEach(field => {
      if (!field.response) {
        field.response = 'Not Answered';
      }
    });

    const newResponse = {
      respondee,
      form: form.id,
      fields,
    };

    const formFields = form.fields.map(field => field.fieldName);
    const fieldsArr = fields.map(field => field.fieldName);
    const isValid = fieldsArr.every(field => formFields.includes(field));

    for (let field of formFields) {
      if (!fieldsArr.includes(field) && field !== 'Email') {
        newResponse.fields.push({
          fieldName: field,
          response: 'Not Answered',
        });
      }
    }

    if (!isValid) {
      return res.status(400).send({ error: 'Invalid fields' });
    }

    const response = await Response.create(newResponse);

    const responseTextArr = fields.map(
      field => `${field.fieldName}: ${field.response}`
    );

    sendResponseEmail({
      respondeeEmail: respondee,
      creatorEmail: form.user.email,
      responseText: responseTextArr.join('\n'),
    });

    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
