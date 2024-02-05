const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const options = require("./config/corsOptions");
const corsOptions = require("./config/corsOptions");
const PORT = 3000;
const app = express();
app.use(cors(corsOptions));
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

app.get("/", (req, res) => res.send("hello world"));
io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });
  socket.on('join-room', (room, cb) => { 
      socket.join(room); 
      cb(`joined room: ${room}`);
  })
});

httpServer.listen(PORT, () => console.log(`Server is running on port${PORT}`));
