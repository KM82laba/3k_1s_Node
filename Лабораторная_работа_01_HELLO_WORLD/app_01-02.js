const http = require('http');
 
const hostname = '127.0.0.1';
const port = 3000;
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => 
{
  const parsedUrl = url.parse(req.url);
  console.log("Client was connect!");
  if(req.method == "GET"){
  res.end(`<div style="color:black;"> ${req.method}</br>${parsedUrl.pathname}</br>${req.httpVersion}</br>${req.headers}</br>Get dont have body:${null}</div>`);
  }
  else{
    let body ='';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end',() => {
        console.log(body);
        res.end('ok');
    });
  }
})

 server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });