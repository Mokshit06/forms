const mongoose = require('mongoose');
const shortid = require('shortid');
const Response = require('./response');

const formSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, "You aren't authenticated"],
  },
  shortid: {
    type: String,
    default: shortid.generate,
  },
  fields: [
    {
      fieldName: {
        type: String,
        required: [true, 'Please enter a field name'],
      },
      fieldType: {
        type: String,
        enum: ['text', 'number'],
      },
      fieldPlaceHolder: {
        type: String,
        default: 'Enter the input here',
      },
    },
  ],
});

formSchema.pre('save', function () {
  const form = this;
  form.fields.unshift({
    fieldName: 'Email',
    fieldType: 'text',
    fieldPlaceHolder: 'Enter your email',
  });
});

formSchema.pre('remove', async function () {
  await Response.deleteMany({ form: this.id });
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
