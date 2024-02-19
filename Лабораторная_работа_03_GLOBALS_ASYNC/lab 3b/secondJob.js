function secondJob() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Ошибка второй задачи'));
      }, 3000);
    });
  }
  
  secondJob()
    .then((result) => {
      console.log('С использованием обработчиков Promise:', result);
    })
    .catch((error) => {
      console.error('Ошибка при обработке Promise:', error.message);
    });
  
  async function handleSecondJobWithAsyncAwait() {
    try {
      const result = await secondJob();
      console.log('С использованием async/await и try/catch:', result);
    } catch (error) {
      console.error('Ошибка при обработке async/await:', error.message);
    }
  }
  
  handleSecondJobWithAsyncAwait();
  