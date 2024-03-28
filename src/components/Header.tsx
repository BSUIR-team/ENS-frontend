import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <header>
      <div className="container">
        <h1>Notification System</h1>
        <div className="children">{children}</div>
      </div>
    </header>
  );
};

export default Header;
