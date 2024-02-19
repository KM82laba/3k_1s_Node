const http = require('http');

const port = 5000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
    if (req.url === '/api/name' && req.method === 'GET') {
      const fullName = 'Klochko Maxim Sergeevich';
  
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(fullName);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
  
  
  server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
  });