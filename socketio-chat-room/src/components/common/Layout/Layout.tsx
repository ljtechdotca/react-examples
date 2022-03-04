import { UserState } from "@types";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { UserContext } from "src/hooks/use-user";
import { UsersContext } from "src/hooks/use-users";
import { Header } from "..";
import { SocketContext } from "../../../hooks";
import styles from "./Layout.module.scss";

interface LayoutProps {}

export const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user, setUser] = useState<UserState | null>(null);
  const [users, setUsers] = useState<UserState[]>([]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <UserContext.Provider value={{ user, setUser }}>
        <UsersContext.Provider value={{ users, setUsers }}>
          <Header />
          <main className={styles.root}>{children}</main>
        </UsersContext.Provider>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
};

export default Layout;
