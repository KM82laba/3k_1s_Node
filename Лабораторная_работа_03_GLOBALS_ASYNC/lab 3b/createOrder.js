const { v4: uuidv4 } = require('uuid');

function validateCard(cardNumber) {
  console.log('Card Number:', cardNumber);
  return Math.random() < 0.5; 
}

function createOrder(cardNumber) {
  return new Promise((resolve, reject) => {
    if (validateCard(cardNumber)) {
      const orderId = uuidv4();
      setTimeout(() => {
        resolve(orderId);
      }, 5000);
    } else {
      reject(new Error('Card is not valid'));
    }
  });
}

function proceedToPayment(orderId) {
  console.log('Order ID:', orderId);
  return new Promise((resolve, reject) => {
    const paymentSuccess = Math.random() < 0.5; 

    if (paymentSuccess) {
      resolve('Payment successful');
    } else {
      reject(new Error('Payment failed'));
    }
  });
}

createOrder('1234567890123456')
  .then((orderId) => {
    return proceedToPayment(orderId);
  })
  .then((paymentResult) => {
    console.log(paymentResult);
  })
  .catch((error) => {
    console.error(  error.message);
  });

async function handleOrderAndPayment() {
  try {
    const orderId = await createOrder('1234567890123456');
    const paymentResult = await proceedToPayment(orderId);
    console.log(paymentResult);
  } catch (error) {
    console.error(error.message);
  }
}

handleOrderAndPayment();
