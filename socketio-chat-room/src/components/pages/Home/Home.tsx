import { useEffect } from "react";
import { Chat } from "src/components/common";
import { List } from "src/components/ui";
import { useSocket } from "src/hooks";
import { useUser } from "src/hooks/use-user";
import styles from "./Home.module.scss";

interface HomeProps {}

export const Home = ({}: HomeProps) => {
  const { socket } = useSocket();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (socket) {
      socket.on("register", (data) => {
        setUser(data);
      });
    }
  }, [setUser, socket]);

  return (
    <div className={styles.root}>
      <Chat />
      <List />
    </div>
  );
};

export default Home;
