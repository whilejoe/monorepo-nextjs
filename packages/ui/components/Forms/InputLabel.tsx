import { inputLabel } from "./Forms.css";
import { srOnly } from "../../styles/utils.css";
import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  /** Only show label to screen readers */
  hideVisually?: boolean;
  /** Associates the label to the input for accessibility */
  inputId: string;
};

const InputLabel = ({
  children,
  className,
  disabled,
  hideVisually,
  inputId,
}: Props) => {
  const classNames = clsx(inputLabel, className, {
    [srOnly]: hideVisually,
  });

  return (
    <label className={classNames} data-disabled={disabled} htmlFor={inputId}>
      {children}
    </label>
  );
};

export { InputLabel };
