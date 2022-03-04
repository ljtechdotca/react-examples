import { UsersStateContext } from "@types";
import { createContext, useContext } from "react";

export const UsersContext = createContext<UsersStateContext>({
  users: [],
  setUsers: () => {},
});

export const useUsers = () => {
  const { users, setUsers } = useContext(UsersContext);

  return { users, setUsers };
};
