const http = require('http');
const fs = require('fs');
const nodemailer = require('nodemailer');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const path = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  
  fs.readFile(`.${path}`, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end('404 Not Found');
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'maskabedwars@gmail.com',
    pass: 'jqgt quio dwwm ogmp',
  },
});

server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url === '/send-email') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);

      const from = formData.get('from');
      const to = formData.get('to');
      const subject = 'Test Email';
      const text = formData.get('message');

      const mailOptions = {
        from,
        to,
        subject,
        text,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('Internal Server Error');
        } else {
          console.log('Email sent: ' + info.response);
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('Email sent successfully');
        }
      });
    });
  }
});