const router = require('express').Router();
const Form = require('../models/form');
const Response = require('../models/response');
const { sendResponseEmail } = require('../email/email');
const moment = require('moment');

router.post('/:shortid', async (req, res, next) => {
  const shortid = req.params.shortid;
  try {
    const form = await Form.findOne({ shortid }).populate('user');

    if (!form) {
      return res.status(404).send({ message: 'Form not found' });
    }

    const { respondee, fields } = req.body;

    const hasAlreadyAnswered = async () => {
      try {
        const form = await Form.findOne({ shortid });
        const response = await Response.find({ respondee, form: form.id });
        if (response.length > 0) {
          return true;
        }
        return false;
      } catch (error) {
        next('Something went wrong');
      }
    };

    if (await hasAlreadyAnswered()) {
      return res
        .status(400)
        .json({ message: 'You can only submit your response once' });
    }

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

    const responseTextArr = fields.map(field => {
      if (field.fieldType === 'date') {
        return `${field.fieldName}: ${moment(field.response).format(
          'DD MMMM YYYY'
        )}`;
      }
      return `${field.fieldName} : ${field.response}`;
    });

    await Response.create(newResponse);

    sendResponseEmail({
      respondeeEmail: respondee,
      creatorEmail: form.user.email,
      responseText: responseTextArr.join('\n'),
      formTitle: form.title,
    });

    res.status(201).send({ message: 'Form submitted' });
  } catch ({ errors }) {
    const error = errors[Object.keys(errors)[0]] || errors;
    const errorMsg = error.properties || error;
    res.status(400).json({ message: errorMsg.message || errorMsg });
  }
});

module.exports = router;
