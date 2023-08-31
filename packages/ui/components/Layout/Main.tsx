import { ReactNode } from "react";
import { clsx } from "clsx";
import { main, mainWithContainer } from "./Layout.css";

type Props = {
  children?: ReactNode;
  fullMain?: boolean;
};

const Main = ({ children, fullMain }: Props) => {
  return (
    <main
      className={clsx({
        [main]: fullMain,
        [mainWithContainer]: !fullMain,
      })}
    >
      {children}
    </main>
  );
};

export { Main };
