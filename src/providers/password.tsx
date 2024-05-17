"use client";

import * as React from "react";

export type PasswordStateContextValue = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordStateContext = React.createContext<PasswordStateContextValue>({
  show: false,
  setShow: () => {},
});

export const PasswordStateProvider = ({ children }: GTypes.Basic.ReactNode) => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <PasswordStateContext.Provider value={{ show, setShow }}>
      {children}
    </PasswordStateContext.Provider>
  );
};

export const usePasswordStateContext = () =>
  React.useContext(PasswordStateContext);
