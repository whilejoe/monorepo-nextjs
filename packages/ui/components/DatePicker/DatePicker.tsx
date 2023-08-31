import { useCallback, useRef, useState } from "react";
import { useDatePicker } from "react-aria";
import { DateValue } from "@internationalized/date";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import {
  FieldPathByValue,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import {
  DateField,
  InputError,
  InputGroup,
  inputContainer,
  inputLabel,
} from "../Forms";

type InputProps = Pick<
  DatePickerStateOptions<DateValue>,
  "granularity" | "minValue" | "maxValue" | "hideTimeZone" | "placeholderValue"
>;

export interface DatePickerProps<
  TFieldValues extends FieldValues,
  Path extends FieldPathByValue<TFieldValues, DateValue | null>
> extends InputProps,
    UseControllerProps<TFieldValues, Path> {
  disabled?: boolean;
  /** Only show label to screen readers */
  hideLabel?: boolean;
  /** Associates the input to its label for accessibility.
   * @default name
   */
  id?: string;
  label: string;
}

const DatePicker = <
  TFieldValues extends FieldValues,
  Path extends FieldPathByValue<TFieldValues, DateValue | null>
>({
  control,
  defaultValue,
  disabled,
  hideTimeZone = true,
  id,
  name,
  rules,
  shouldUnregister,
  ...props
}: DatePickerProps<TFieldValues, Path>) => {
  const inputRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const state = useDatePickerState(props);
  const { groupProps, labelProps, fieldProps } = useDatePicker(
    props,
    state,
    inputRef
  );

  const { field, fieldState } = useController<TFieldValues, Path>({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  });

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    field.onBlur;
  }, [field.onBlur]);

  const hasError = !!fieldState.error;
  const inputId = id || name;
  const errorId = `${inputId}-error`;

  return (
    <InputGroup hasError={hasError} isDisabled={disabled} isFocused={isFocused}>
      <span {...labelProps} className={inputLabel} data-disabled={disabled}>
        {props.label}
      </span>
      <div
        {...groupProps}
        ref={inputRef}
        className={inputContainer}
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{ display: "flex" }}
      >
        <DateField
          {...fieldProps}
          hideTimeZone={hideTimeZone}
          onChange={field.onChange}
          value={field.value}
        />
      </div>

      {hasError && (
        <InputError errorId={errorId}>{fieldState.error?.message}</InputError>
      )}
    </InputGroup>
  );
};

export { DatePicker };
