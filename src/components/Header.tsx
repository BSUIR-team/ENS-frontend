import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <header>
      <h1>Notification System</h1>
      {children}
    </header>
  );
};

export default Header;
