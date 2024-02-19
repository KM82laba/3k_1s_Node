const {send} = require('m06-mks');

const senderEmail = 'maskabedwars@gmail.com';
const senderPassword = 'jqgt quio dwwm ogmp';

send(senderEmail, senderPassword, 'Сообщение от 06-04 глобальный репозиторий')
  .then((result) => {
    console.log('Email sent successfully:', result);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });