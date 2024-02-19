const http = require('http');
const url = require('url');

const PORT = 5000;
const HOST = 'localhost';

// Рекурсивная функция для расчета факториала
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  // Проверка, что запрос имеет вид /fact и содержит параметр k
  if (reqUrl.pathname === '/fact' && reqUrl.query.k) {
    const k = parseInt(reqUrl.query.k, 10);

    // Проверка, что k - целое неотрицательное число
    if (!isNaN(k) && k >= 0) {
      const fact = calculateFactorial(k);
      const response = { k, fact }; 

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid value for k' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Сервер запущен по адресу http://${HOST}:${PORT}`);
});
