import { ReactNode } from "react";
import { shell } from "./Layout.css";

type Props = {
  children?: ReactNode;
};

const Shell = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={shell}>
      {children}
    </div>
  );
};

export { Shell };
