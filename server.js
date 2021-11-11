const express = require("express");
const socket = require("socket.io");

const data = require("./data.js");

const server = express();
const listen = server.listen(5000, () => {
  console.log("http://localhost:5000 listening...");
});

server.use(express.static("public"));
const io = socket(listen);

// server.get('/', (req, res) => {
//   res.send('Hi!')
// })

// restful api
server.get("/actors", (req, res) => {
  res.status(200).json(data);
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
