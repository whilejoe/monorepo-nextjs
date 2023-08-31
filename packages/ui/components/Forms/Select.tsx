import { forwardRef } from "react";
import { AccessibleIcon } from "../AccessibleIcon";
import {
  filled,
  hideLabelInputBase,
  inputBase,
  InputContainer,
  InputError,
  InputGroup,
  InputHint,
  InputLabel,
  selectOption,
} from ".";
import { Box } from "ui/components/Box";
import { MdExpandMore } from "react-icons/md";
import { useCallback, useState } from "react";
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import clsx from "clsx";

type InputProps = Pick<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  | "autoFocus"
  | "autoComplete"
  | "disabled"
  | "inputMode"
  | "onBlur"
  | "onFocus"
  | "placeholder"
>;

type SelectProps<
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
  inputId: string;
  children?: React.ReactNode;
} & InputProps &
  UseControllerProps<TFieldValues, TName>;

const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: SelectProps<TFieldValues, TName>
) => {
  const {
    autoFocus,
    autoComplete,
    children,
    disabled,
    hideLabel,
    id,
    inputHint,
    label,
    name,
    onBlur,
    onFocus,
    placeholder,
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
        <select
          {...fieldRest}
          autoFocus={autoFocus}
          aria-errormessage={errorId}
          aria-invalid={hasError}
          autoComplete={autoComplete}
          className={clsx(inputBase, {
            [hideLabelInputBase]: hideLabel,
          })}
          disabled={disabled}
          id={inputId}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{ paddingRight: "15px" }}
        >
          <>
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {!placeholder && !hideLabel && (
              <option value="" disabled hidden></option>
            )}

            {children}
          </>
        </select>
        <InputLabel
          disabled={disabled}
          hideVisually={hideLabel}
          inputId={inputId}
          className={fieldRest.value || placeholder ? filled : ""}
        >
          {label}
        </InputLabel>
        <Box
          position="absolute"
          right={0}
          mr="2x"
          mt="2x"
          color={disabled ? "muted" : undefined}
          pointerEvents="none"
        >
          <AccessibleIcon icon={<MdExpandMore size={20} />} />
        </Box>
      </InputContainer>
      {inputHint && !hasError && <InputHint>{inputHint}</InputHint>}
      {hasError && (
        <InputError errorId={errorId}>{fieldState.error?.message}</InputError>
      )}
    </InputGroup>
  );
};

const SelectOption = forwardRef<
  HTMLOptionElement,
  React.ComponentPropsWithoutRef<"option">
>((props, ref) => {
  return <option ref={ref} {...props} className={selectOption} />;
});

SelectOption.displayName = "SelectOption";

export { Select, SelectOption };
