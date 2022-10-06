
/*Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 4).
We define a route handler / that gets called when we hit our website home.
We make the http server listen on port 3000. */

// require() is a node keyword that loads modules

const express = require('express');
const app = express();
const http = require('http');
const { isObjectBindingPattern } = require('typescript');
const server = http.createServer(app);
// { } is a destructuring assignment. Now "Server" here will be automatically assigned to the "Server" object in the socket.io module
const { Server } = require("socket.io")
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/css'));

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg)
    });
    socket.on('user typing', (bool) => {
      console.log('user is typing');
      io.emit('user typing');
    });  
  });
server.listen(3000, () => {
    console.log('listening on *:3000');
});

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets



