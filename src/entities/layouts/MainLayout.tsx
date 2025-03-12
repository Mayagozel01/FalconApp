import { ReactNode } from "react";
import { Navbar } from "react-bootstrap";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Navbar variant="light" expand="lg">
      {children}
    </Navbar>
  );
};
