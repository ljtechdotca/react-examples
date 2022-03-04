import { useEffect } from "react";
import { useSocket, useUsers } from "src/hooks";
import { Item } from "..";
import styles from "./List.module.scss";

interface ListProps {}

export const List = ({}: ListProps) => {
  const { socket } = useSocket();
  const { users, setUsers } = useUsers();

  useEffect(() => {
    if (socket) {
      socket.on("users", (data) => {
        setUsers(data);
      });
    }
  }, [setUsers, socket]);

  return (
    <ul className={styles.root}>
      {Object.values(users).map((user) => (
        <Item key={user.id} {...user} />
      ))}
    </ul>
  );
};

export default List;
