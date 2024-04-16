import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Header = ({ children }: Props) => {
  return (
    <header>
      <div className="container">
        <h1>Notification System</h1>
        <nav className="children">{children}</nav>
      </div>
    </header>
  );
};

export default Header;
