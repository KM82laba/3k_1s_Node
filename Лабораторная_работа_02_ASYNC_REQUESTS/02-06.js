const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
    if (req.url === '/api/name' && req.method === 'GET') {
      const fullName = 'Клочко Максим Сергеевич';
  
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(fullName);
    } else if (req.url === '/jquery' && req.method === 'GET') {
      const filePath = path.join(__dirname, 'jquery.html');
  
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain ; charset=utf-8' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
  });