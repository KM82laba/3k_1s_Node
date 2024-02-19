const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
    if (req.url === '/png' && req.method === 'GET') {
      const filePath = path.join(__dirname, 'pic.png');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'image/png' });
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