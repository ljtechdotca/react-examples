import { MessageState, UserState } from "@types";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { hex } from "../helpers/hex";
import { uid } from "../helpers/uid";

let users: Record<string, UserState> = {};
let messages: MessageState[] = [];

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  socket.on("register", async (action) => {
    console.log(socket.id);
    const key = socket.id.toLowerCase().replace(/[^a-z]/g, "");
    const newUser: UserState = { ...action, color: hex(), id: key };
    socket.data.user = newUser;
    Object.assign(users, { [key]: { ...newUser } });
    socket.emit("register", newUser);
    io.emit("users", users);
  });

  socket.on("message", async (action) => {
    const newMessage: MessageState = { ...action, id: uid() };
    messages.push(newMessage);
    io.emit("message", messages);
  });

  socket.on("disconnect", async () => {
    const newMessage: MessageState = {
      user: socket.data.user,
      content: "has disconnected...",
      id: uid(),
    };
    messages.push(newMessage);
    delete users[socket.data.user.id];
    io.emit("message", messages);
    io.emit("users", users);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
