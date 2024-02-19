const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const DB = require('./dbModule');

const db = new DB();

db.on('GET', data => {
  console.log('Событие GET:', data);
});

db.on('POST', data => {
  console.log('Событие POST:', data);
});

db.on('PUT', data => {
  console.log('Событие PUT:', data);
});

db.on('DELETE', data => {
  console.log('Событие DELETE:', data);
});

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;
    const queryParams = parsedUrl.query;
  
    res.setHeader('Content-Type', 'application/json');
  
    if (pathName === '/api/db') {
      if (req.method === 'GET') {
        const data = await db.select();
        res.end(JSON.stringify(data));
      } else if (req.method === 'POST') {
        let requestData = '';
        req.on('data', chunk => {
          requestData += chunk;
        });
  
        req.on('end', async () => {
          const newData = JSON.parse(requestData);
          const result = await db.insert(newData.name, newData.bday);
          res.end(JSON.stringify(result));
        });
      } else if (req.method === 'PUT') {
        let requestData = '';
        req.on('data', chunk => {
          requestData += chunk;
        });
  
        req.on('end', async () => {
          const newData = JSON.parse(requestData);
          const result = await db.update(queryParams.id, newData.name, newData.bday);
          res.end(JSON.stringify(result));
        });
      } else if (req.method === 'DELETE') {
        const result = await db.delete(queryParams.id);
        res.end(JSON.stringify(result));
      }
    } else if (pathName === '/') {
      const indexPath = path.join(__dirname, 'index.html');
      const fileContent = fs.readFileSync(indexPath, 'utf-8');
      res.setHeader('Content-Type', 'text/html');
      res.end(fileContent);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
