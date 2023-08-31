import { ReactNode } from "react";
import { container } from "./Layout.css";

type Props = {
  children?: ReactNode;
};

const Container = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={container}>
      {children}
    </div>
  );
};

export { Container };
