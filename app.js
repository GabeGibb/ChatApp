const express = require('express');
const ws = require('ws');

const app = express();
app.use(express.static('public'));

// Set up a headless websocket server that prints any
// events that come in.
const wsServer = new ws.Server({ noServer: true });
let CLIENTS = [];
let messages = [];

wsServer.on('connection', socket => {
    CLIENTS.push(socket);
    socket.on('message', message => {
        let m = message.toString('utf-8')
        messages.push(m)
        for (let i = 0; i < CLIENTS.length; i++){
            if (CLIENTS[i] != socket){
            CLIENTS[i].send(m)
            }
        }
    })

    socket.on('close',  () => {
        console.log('user disconnect', CLIENTS.length)
        const index = CLIENTS.indexOf(socket);
        if (index > -1) {
            CLIENTS.splice(index, 1);
        }
    })
});



app.get('/', (req, res) => {
    res.sendFile('public\\index.html', {root: __dirname});
})

app.get('/messages', (req, res) => {
    res.send(messages)
})


const server = app.listen(3000, () =>{
    console.log('http://localhost:3000/')
});


server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});

