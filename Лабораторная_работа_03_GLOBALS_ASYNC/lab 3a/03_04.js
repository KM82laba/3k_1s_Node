const http = require('http');
const url = require('url');
const fs = require('fs');

// Асинхронная реализация расчета факториала
function calculateFactorialAsync(n, callback) {
  if (n === 0 || n === 1) {
    process.nextTick(() => callback(null, 1));
  } else {
    process.nextTick(() => {
      calculateFactorialAsync(n - 1, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          const factorial = n * result;
          callback(null, factorial);
        }
      });
    });
  }
}

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname === '/fact' && reqUrl.query.k) {
    const k = parseInt(reqUrl.query.k, 10);

    if (!isNaN(k) && k >= 0) {
      // Используем асинхронную функцию для расчета факториала
      calculateFactorialAsync(k, (err, fact) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Server Error' }));
        } else {
          const response = { k, fact };

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(response));
        }
      });
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid value for k' }));
    }
    }
    else if (reqUrl.pathname === '/') {
        // Чтение HTML-файла и отправка его в ответе
        const htmlContent = fs.readFileSync('index.html', 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } 
    else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

const PORT = 5000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});
