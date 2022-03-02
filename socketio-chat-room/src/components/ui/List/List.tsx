import { UserState } from "@types";
import { useEffect, useState } from "react";
import { useSocket } from "src/hooks";
import { Item } from "..";
import styles from "./List.module.scss";

interface ListProps {}

export const List = ({}: ListProps) => {
  const [users, setUsers] = useState<UserState[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("users", (data) => {
        setUsers(data);
      });
    }
  }, [socket]);

  return (
    <ul className={styles.root}>
      {Object.values(users).map((user) => (
        <Item key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default List;
