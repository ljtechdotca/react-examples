import { UserState } from "@types";
import React, { useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button, Input } from "src/components/ui";
import { useUser } from "src/hooks/use-user";
import { INIT_CON_OPTS } from "../../../constants";
import { useSocket } from "../../../hooks";
import styles from "./Header.module.scss";

declare global {
  interface Window {
    socket: Socket;
  }
}

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  const [form, setForm] = useState<Partial<UserState>>({
    avatar: "",
    name: "",
  });
  const { socket, setSocket } = useSocket();
  const { user } = useUser();

  const signOut = () => {
    if (socket) {
      socket.emit("signout");
    }
  };

  const register = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newSocket: Socket | null = null;

    newSocket = window.socket
      ? window.socket
      : io("http://localhost:3001", INIT_CON_OPTS);

    setSocket(newSocket);

    newSocket.emit("register", { ...form, id: newSocket.id });
  };

  return (
    <div className={styles.root}>
      {user ? (
        <>
          {user.name}

          <Button label="Sign Out" onClick={signOut} />
        </>
      ) : (
        <form onSubmit={register}>
          <Input
            id="name"
            name="name"
            value={form.name}
            type="text"
            placeholder="Username"
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                name: event.target.value,
              }))
            }
          />
          <Input
            id="avatar"
            name="avatar"
            value={form.avatar}
            type="url"
            placeholder="Avatar url"
            onChange={(event) =>
              setForm((currentForm) => ({
                ...currentForm,
                avatar: event.target.value,
              }))
            }
          />
          <Button label="Sign In" />
        </form>
      )}
    </div>
  );
};

export default Header;
