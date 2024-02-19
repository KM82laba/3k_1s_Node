function calculateSquare(number) {
    return new Promise((resolve, reject) => {
      if (typeof number !== 'number') {
        reject(new Error('Invalid input.'));
      } else {
        resolve(number * number);
      }
    });
  }
  
  function calculateCube(number) {
    return new Promise((resolve, reject) => {
      if (typeof number !== 'number') {
        reject(new Error('Invalid input.'));
      } else {
        resolve(number * number * number);
      }
    });
  }
  
  function calculateFourthPower(number) {
    return new Promise((resolve, reject) => {
      if (typeof number !== 'number') {
        reject(new Error('Invalid input.'));
      } else {
        resolve(Math.pow(number, 4));
      }
    });
  }
  
  const inputNumber = 3;
  
  Promise.all([
    calculateSquare(inputNumber),
    calculateCube(inputNumber),
    calculateFourthPower(inputNumber),
  ])
    .then((results) => {
      console.log('Square:', results[0]);
      console.log('Cube:', results[1]);
      console.log('Fourth Power:', results[2]);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  