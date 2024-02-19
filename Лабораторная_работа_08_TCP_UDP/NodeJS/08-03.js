const dgram = require('dgram');

const server = dgram.createSocket('udp4');

const PORT = 3000;

server.on('listening', () => {
  const address = server.address();
  console.log(`${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
  const receivedMessage = message.toString('utf-8');

  console.log(`Сообщение отправлено от${remote.address}:${remote.port} сообщение: ${receivedMessage}`);

  const responseMessage = `ECHO: ${receivedMessage}`;

  server.send(responseMessage, remote.port, remote.address, (err) => {
    if (err) {
      console.error(`Ошибка отправки сообщения${remote.address}:${remote.port}: ${err.message}`);
    } else {
      console.log(`Ответное сообщение ${remote.address}:${remote.port}: ${responseMessage}`);
    }
  });
});

server.bind(PORT);
