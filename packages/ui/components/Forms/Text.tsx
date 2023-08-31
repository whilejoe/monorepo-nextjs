import { useCallback, useState } from "react";
import {
  useController,
  UseControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { InputLabel } from "./InputLabel";
import { InputError } from "./InputError";
import { InputContainer } from "./InputContainer";
import { InputGroup } from "./InputGroup";
import { InputHint } from "./InputHint";
import { filled, inputBase } from "./Forms.css";

type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  | "autoFocus"
  | "autoComplete"
  | "disabled"
  | "enterKeyHint"
  | "inputMode"
  | "onBlur"
  | "onFocus"
  | "placeholder"
>;

export type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  /** Only show label to screen readers */
  hideLabel?: boolean;
  /** Associates the input to its label for accessibility.
   * @default name
   */
  id?: string;
  /** Provides additional context to the input */
  inputHint?: string;
  label: string;
  /** Input type
   * @default "text"
   */
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "number"
    | "time"
    | "datetime-local";
  min?: string;
  max?: string;
} & InputProps &
  UseControllerProps<TFieldValues, TName>;

const Text = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: Props<TFieldValues, TName>
) => {
  const {
    autoFocus,
    autoComplete,
    disabled,
    enterKeyHint,
    hideLabel,
    id,
    inputHint,
    inputMode,
    label,
    name,
    onBlur,
    onFocus,
    placeholder,
    type = "text",
    min,
    max,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const { field, fieldState } = useController(props);
  const { onBlur: fieldOnBlur, ...fieldRest } = field;

  const handleFocus = useCallback(
    (e: React.FocusEvent<any>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<any>) => {
      setIsFocused(false);
      fieldOnBlur();
      if (onBlur) onBlur(e);
    },
    [fieldOnBlur, onBlur]
  );

  const hasError = !!fieldState.error;
  const inputId = id || name;
  const errorId = `${inputId}-error`;

  return (
    <InputGroup hasError={hasError} isDisabled={disabled} isFocused={isFocused}>
      <InputContainer>
        <input
          {...fieldRest}
          autoFocus={autoFocus}
          aria-errormessage={errorId}
          aria-invalid={hasError}
          autoComplete={autoComplete}
          className={inputBase}
          disabled={disabled}
          enterKeyHint={enterKeyHint}
          id={inputId}
          inputMode={inputMode}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          type={type}
          min={min}
          max={max}
        />
        <InputLabel
          className={fieldRest.value || placeholder ? filled : ""}
          disabled={disabled}
          hideVisually={hideLabel}
          inputId={inputId}
        >
          {label}
        </InputLabel>
      </InputContainer>
      {inputHint && !hasError && <InputHint>{inputHint}</InputHint>}
      {hasError && (
        <InputError errorId={errorId}>{fieldState.error?.message}</InputError>
      )}
    </InputGroup>
  );
};

export { Text };
