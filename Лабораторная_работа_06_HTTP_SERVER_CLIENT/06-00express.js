const express = require('express');
const app = express();

app.get('/connection', (req, res) => {
  if (!req.query.set) {
    // Получение текущего значения параметра keepAliveTimeout
    const keepAliveTimeoutValue = req.connection.server.keepAliveTimeout;
    res.send(`Current keepAliveTimeout: ${keepAliveTimeoutValue}`);
  } else {
    // Установка нового значения параметра keepAliveTimeout
    const newKeepAliveTimeout = parseInt(req.query.set);
    req.server.keepAliveTimeout = newKeepAliveTimeout;
    res.send(`New keepAliveTimeout set to: ${newKeepAliveTimeout}`);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
