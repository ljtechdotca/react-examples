import React, { useState } from "react";
import { StoreContext } from "../hooks";

const INIT_STORE = {};

interface StoreProviderProps {}

export const StoreProvider = ({
  children,
}: React.PropsWithChildren<StoreProviderProps>) => {
  const [store, setStore] = useState(INIT_STORE);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};
