import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { createServer } from "http";
import "dotenv/config";
import userRouter from "./routers/userRouter.js";
import messageRouter from "./routers/messageRouter.js";
import { Server } from "socket.io";
import { getLatestMessageOnlineUser } from "./controllers/messageController.js";

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use("/user", userRouter);
app.use("/messages", messageRouter);

httpServer.listen(PORT, () => {
  console.log(`Server is listening to PORT ${PORT}`);
});

global.onlineUser = [];
global.onlineUserDetails = [];

io.on("connection", (socket) => {
  console.log("Client connected: ", socket.id);
  socket.emit("getId", socket.id);
  socket.on("add-user", async (user) => {
    const userExist = onlineUser.find((item) => item.userId === user.id);
    if (!userExist) {
      onlineUser.push({ userId: user.id, socketId: socket.id });
      onlineUserDetails.push(user);
    }
    await getLatestMessageOnlineUser(user.id, onlineUserDetails).then((res) =>
      socket.emit("all-online-users", res)
    );
  });

  socket.on("message", (message) => {
    const socketIdMessageSend = onlineUser.find(
      (item) => item.userId === message.receiverId
    );
    if (socketIdMessageSend)
      socket
        .to(socketIdMessageSend.socketId)
        .emit("sendMessageServer", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    const userRemove = onlineUser.find((item) => item.socketId === socket.id);
    if (userRemove) {
      onlineUser = onlineUser.filter(
        (item) => item.userId !== userRemove.userId
      );
      onlineUserDetails = onlineUserDetails.filter(
        (item) => item.id !== userRemove.userId
      );
    }
  });
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });
