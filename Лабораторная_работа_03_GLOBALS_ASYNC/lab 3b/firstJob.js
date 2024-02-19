function firstJob() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello World');
      }, 2000);
    });
  }
  
  firstJob()
    .then((result) => {
      console.log('С использованием обработчиков Promise:', result);
    })
    .catch((error) => {
      console.error('Ошибка при обработке Promise:', error);
    });
  
  async function handlePromiseWithAsyncAwait() {
    try {
      const result = await firstJob();
      console.log('С использованием async/await и try/catch:', result);
    } catch (error) {
      console.error('Ошибка при обработке async/await:', error);
    }
  }
  
  handlePromiseWithAsyncAwait();
  