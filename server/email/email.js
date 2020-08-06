const sgMail = require('@sendgrid/mail');

const { MASTER_EMAIL_ID: masterEmail, SENDGRID_API_KEY: apiKey } = process.env;

sgMail.setApiKey(apiKey);

const sendWelcomeEmail = ({ email, name }) => {
  sgMail.send({
    to: email,
    from: masterEmail,
    subject: 'Thanks for joining in',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
  });
};

const sendResponseEmail = ({ respondeeEmail, creatorEmail, response }) => {
  const responseText = '';

  sgMail.send({
    to: creatorEmail,
    from: masterEmail,
    subject: `${respondeeEmail} responded to your form`,
    text: responseText,
  });
};

const sendCancelationEmail = ({ email, name }) => {
  sgMail.send({
    to: email,
    from: masterEmail,
    subject: 'Sorry to see you go!',
    text: `Goodbye, ${name}. I hope to see you back sometime soon`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
  sendResponseEmail,
};
