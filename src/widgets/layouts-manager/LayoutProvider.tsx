import React from "react";

export const LayoutContext = React.createContext(null);

type LayoutProviderProps = {
  users: any;
  children: React.ReactNode;
};

export const LayoutProvider = ({ users, children }: LayoutProviderProps) => {
  return (
    <LayoutContext.Provider value={users}>{children}</LayoutContext.Provider>
  );
};
