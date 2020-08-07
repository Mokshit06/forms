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
  title: {
    type: String,
    default: 'Untitled form',
  },
  fields: [
    {
      fieldName: {
        type: String,
        default: 'Question',
      },
      fieldType: {
        type: String,
        enum: ['text', 'number'],
        default: 'text',
      },
      fieldPlaceHolder: {
        type: String,
        default: 'Enter your response here',
      },
    },
  ],
  createdAt: {
    type: Number,
    default: Date.now,
  },
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
