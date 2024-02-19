const http = require('http');
const readline = require('readline');
const PORT = 5000;
const HOST = 'localhost';
let appState = 'norm';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`<h1>${appState}</h1>`);
});


server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
  displayPrompt();
});

function displayPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Используем событие 'line' для обработки ввода
  rl.on('line', (input) => {
    handleUserInput(input.trim());
    rl.close();
  });

  // Добавлено событие 'close' для повторного отображения приглашения
  rl.on('close', () => {
    displayPrompt();
  });

  rl.setPrompt('Введите новое состояние (norm, stop, test, idle, exit): ');
  rl.prompt();
}

function handleUserInput(input) {
  if (input === 'exit') {
    console.log('Приложение завершено.');
    process.exit();
  } else if (['norm', 'stop', 'test', 'idle'].includes(input)) {
    console.log(`${appState} -> ${input}`);
    appState = input;
  } else {
    console.log(`Ошибка: Некорректное состояние - ${input}`);
  }
}
