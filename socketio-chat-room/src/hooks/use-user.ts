import { UserStateContext } from "@types";
import { createContext, useContext } from "react";

export const UserContext = createContext<UserStateContext>({
  user: null,
  setUser: () => {},
});

export const useUser = () => {
  const { user, setUser } = useContext(UserContext);

  return { user, setUser };
};
