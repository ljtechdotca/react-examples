import { UserState } from "@types";
import React, { useState } from "react";
import { Socket } from "socket.io-client";
import { UserContext } from "src/hooks/use-user";
import { Header } from "..";
import { SocketContext } from "../../../hooks";
import styles from "./Layout.module.scss";

interface LayoutProps {}

export const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user, setUser] = useState<UserState | null>(null);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <main className={styles.root}>{children}</main>
      </UserContext.Provider>
    </SocketContext.Provider>
  );
};

export default Layout;
