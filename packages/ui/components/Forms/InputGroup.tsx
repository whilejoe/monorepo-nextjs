import { inputState } from "./Forms.css";
import { clsx } from "clsx";

type Props = {
  children?: React.ReactNode;
  className?: string;
  hasError?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
};

const InputGroup = ({
  children,
  className,
  hasError,
  isDisabled,
  isFocused,
}: Props) => {
  return (
    <div
      className={clsx(
        inputState({
          disabled: isDisabled,
          focused: isFocused,
          error: hasError,
        }),
        className
      )}
      data-state-error={hasError}
      data-state-focused={isFocused}
    >
      {children}
    </div>
  );
};

export { InputGroup };
