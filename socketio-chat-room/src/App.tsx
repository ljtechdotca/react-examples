import React from "react";
import { Socket } from "socket.io-client";
import { Layout } from "./components/common";
import { Home } from "./components/pages";

declare global {
  interface Window {
    socket: Socket;
  }
}

function App() {
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export default App;
