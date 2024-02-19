const {send} = require('./m06-MKS');

const senderEmail = 'maskabedwars@gmail.com';
const senderPassword = 'jqgt quio dwwm ogmp';
const message = 'Привет, это тестовое сообщение!';

send(senderEmail, senderPassword, message)
  .then((result) => {
    console.log('Email sent successfully:', result);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });