const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/connection') {
    if (req.method === 'GET') {
      // Получение текущего значения параметра keepAliveTimeout
      const keepAliveTimeoutValue = server.keepAliveTimeout;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Current keepAliveTimeout: ${keepAliveTimeoutValue}`);
    } else if (parsedUrl.query.set) {
      // Установка нового значения параметра keepAliveTimeout
      const newKeepAliveTimeout = parseInt(parsedUrl.query.set);
      server.keepAliveTimeout = newKeepAliveTimeout;
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`New keepAliveTimeout set to: ${newKeepAliveTimeout}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
