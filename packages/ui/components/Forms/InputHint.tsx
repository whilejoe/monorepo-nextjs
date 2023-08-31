import { inputHint } from "./Forms.css";

type Props = {
  children?: React.ReactNode;
};

const InputHint = ({ children }: Props) => {
  return <span className={inputHint}>{children}</span>;
};

export { InputHint };
