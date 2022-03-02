import React, { createContext, useContext } from "react";

interface StoreContextState {
  store: Record<string, any>;
  setStore: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export const StoreContext = createContext<StoreContextState>({
  store: {},
  setStore: () => {},
});

export const useStore = () => {
  const { store, setStore } = useContext(StoreContext);

  return { store, setStore };
};
