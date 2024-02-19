function calculateSquare(number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(number * number);
      }, 2000);
    });
  }
  
  function calculateCube(number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(number * number * number);
      }, 2000);
    });
  }
  
  function calculateFourthPower(number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.pow(number, 4));
      }, 1500);
    });
  }
  
  const inputNumber = 2;
  
  Promise.race([
    calculateSquare(inputNumber),
    calculateCube(inputNumber),
    calculateFourthPower(inputNumber),
  ])
    .then((result) => {
      console.log('First result (race):', result);
    })
    .catch((error) => {
      console.error('Error:', error.message);
    });
  
  Promise.any([
    calculateSquare(inputNumber),
    calculateCube(inputNumber),
    calculateFourthPower(inputNumber),
  ])
    .then((result) => {
      console.log('First resolved result (any):', result);
    })
    .catch((error) => {
      console.error('All promises were rejected:', error.message);
    });
  