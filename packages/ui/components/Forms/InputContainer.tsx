import { inputContainer } from "./Forms.css";

type Props = {
  children?: React.ReactNode;
};

const InputContainer = ({ children }: Props) => {
  return <div className={inputContainer}>{children}</div>;
};

export { InputContainer };
