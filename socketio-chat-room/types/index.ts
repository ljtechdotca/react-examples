import { Socket } from "socket.io-client";

export interface UserStateContext {
  user: UserState | null;
  setUser: React.Dispatch<React.SetStateAction<UserState | null>>;
}

export interface UsersStateContext {
  users: UserState[];
  setUsers: React.Dispatch<React.SetStateAction<UserState[]>>;
}

export interface SocketStateContext {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export interface UserState {
  id: string;
  color: string;
  avatar: string;
  name: string;
}

export interface MessageState {
  id: string;
  user: UserState;
  content: string;
}
