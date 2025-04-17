import React from "react";
import { ReactNode } from "react";


type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};
