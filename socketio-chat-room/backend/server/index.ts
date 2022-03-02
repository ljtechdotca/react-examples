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
    const key = socket.id.toLowerCase().replace(/[^a-z]/g, "");
    socket.data.key = key;
    const newUser: UserState = { ...action, color: hex(), id: key };
    Object.assign(users, { [key]: { ...newUser } });
    socket.emit("register", newUser);
    io.emit("users", users);
  });

  socket.on("signout", async () => {
    delete users[socket.data.key];
    console.log(users);
    socket.emit("signout");
    io.emit("users", users);
  });

  socket.on("message", async (action) => {
    const newMessage: MessageState = { ...action, id: uid() };
    messages.push(newMessage);
    io.emit("message", messages);
  });
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
