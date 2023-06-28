const express = require('express');
const ws = require('ws');

const app = express();
app.use(express.static('public'));

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
CLIENTS = [];
wsServer.on('connection', socket => {
  CLIENTS.push(socket);

  socket.on('message', message => {
    for (let i = 0; i < CLIENTS.length; i++){
      if (CLIENTS[i] != socket){
        CLIENTS[i].send(message.toString('utf-8'))
      }
    }
  })

  socket.on('close',  () => {
    console.log('user disconnect')
  })
});


app.get('/', (req, res) => {
  res.sendFile('public\\index.html', {root: __dirname});
})

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(3000);
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});