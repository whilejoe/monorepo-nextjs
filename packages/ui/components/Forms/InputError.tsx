import { inputError } from "./Forms.css";

type Props = {
  children?: React.ReactNode;
  /** Associates the error message to the input for accessibility */
  errorId: string;
};

const InputError = ({ children, errorId }: Props) => {
  return (
    <span aria-live="polite" className={inputError} id={errorId}>
      {children}
    </span>
  );
};

export { InputError };
