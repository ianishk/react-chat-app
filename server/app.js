const express = require("express");
const app = express();
const http = require("http");

const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const auth = require("./middlewares/auth");
const cors = require("cors");

// app must include .env file
require("dotenv").config();

// app to include the userRoutes

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/message", auth, messageRoutes);

const { Server } = require("socket.io");

const server = http.createServer(app);

const port = process.env.PORT || 5000;

// connect to mongodb
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() =>
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_chat", (data) => {
    socket.join(data);
  });
  socket.on("post_message", (data) => {
    socket
      .to(data.chatId)
      .emit("receive_message", {
        text: data.text,
        sent: data.sent,
        to: data.to,
      });
  });
});
