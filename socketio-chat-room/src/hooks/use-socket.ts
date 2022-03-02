import { createContext, useContext } from "react";
import { SocketStateContext } from "../../types";

export const SocketContext = createContext<SocketStateContext>({
  socket: null,
  setSocket: () => {},
});

export const useSocket = () => {
  const { socket, setSocket } = useContext(SocketContext);

  return { socket, setSocket };
};
