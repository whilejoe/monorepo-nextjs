import { ReactNode } from "react";
import { header, headerContainer } from "./Layout.css";

type Props = {
  children?: ReactNode;
};

const Header = ({ children, ...props }: Props) => {
  return (
    <header {...props} className={header}>
      <div className={headerContainer}>{children}</div>
    </header>
  );
};

export { Header };
