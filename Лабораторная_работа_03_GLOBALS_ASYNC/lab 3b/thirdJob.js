function thirdJob(data) {
    return new Promise((resolve, reject) => {
      if (typeof data !== 'number') {
        reject(new Error('Ошибка: data не является числом'));
      } else if (data % 2 === 1) {
        setTimeout(() => {
          resolve('odd');
        }, 1000);
      } else if (data % 2 === 0) {
        setTimeout(() => {
          reject(new Error('even'));
        }, 2000);
      }
    });
  }
  
  thirdJob(5)
    .then((result) => {
      console.log('С использованием обработчиков Promise:', result);
    })
    .catch((error) => {
      console.error('Ошибка при обработке Promise:', error.message);
    });
  
  async function handleThirdJobWithAsyncAwait() {
    try {
      const result = await thirdJob(3);
      console.log('С использованием async/await и try/catch:', result);
    } catch (error) {
      console.error('Ошибка при обработке async/await:', error.message);
    }
  }
  
  handleThirdJobWithAsyncAwait();
  