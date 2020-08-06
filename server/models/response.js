const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: [true, "You aren't authenticated"],
  // },
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'form',
  },
  fields: [
    {
      fieldName: {
        type: String,
        required: [true, 'Please enter a field name'],
      },
      response: {
        type: String,
        default: '',
      },
    },
  ],
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
