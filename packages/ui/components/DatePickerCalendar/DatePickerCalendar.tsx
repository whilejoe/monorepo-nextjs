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
  InputContainer,
  InputLabel,
  segmentPlaceholder,
  filled,
} from "../Forms";
import { Button } from "../Button";
import { Popover, PopoverTrigger, PopoverContent } from "ui/components/Popover";
import { Calendar } from "../Calendar";
import { AccessibleIcon } from "../AccessibleIcon";
import { MdCalendarMonth } from "react-icons/md";
import { Box } from "../Box";
import { calendarButton, popoverContent } from "./DatePickerCalendar.css";

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

const DatePickerCalendar = <
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
  const [calendarOpen, setCalendarOpen] = useState(false);

  const state = useDatePickerState(props);
  const { groupProps, labelProps, fieldProps, calendarProps } = useDatePicker(
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

  const handleOnChange = useCallback(
    (value: DateValue) => {
      field.onChange(value);
      setCalendarOpen(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.onChange]
  );

  const hasError = !!fieldState.error;
  const inputId = id || name;
  const errorId = `${inputId}-error`;

  return (
    <InputGroup hasError={hasError} isDisabled={disabled} isFocused={isFocused}>
      <Box display="flex">
        <div
          {...groupProps}
          ref={inputRef}
          className={inputContainer}
          onBlur={handleBlur}
          onFocus={handleFocus}
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            minWidth: "140px",
          }}
        >
          <DateField
            {...fieldProps}
            hideTimeZone={hideTimeZone}
            onChange={field.onChange}
            value={field.value}
          />
          <InputLabel
            inputId={labelProps.id!}
            {...labelProps}
            className={field.value || segmentPlaceholder ? filled : ""}
            data-disabled={disabled}
          >
            {props.label}
          </InputLabel>
        </div>

        <Popover onOpenChange={setCalendarOpen} open={calendarOpen}>
          <PopoverTrigger asChild>
            <Button className={calendarButton} type="button">
              <AccessibleIcon
                label={"Calendar"}
                icon={<MdCalendarMonth size={18} />}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            alignOffset={-110}
            avoidCollisions={false}
            className={popoverContent}
            side="bottom"
            sideOffset={15}
          >
            <Calendar
              {...calendarProps}
              value={field.value}
              onChange={handleOnChange}
            />
          </PopoverContent>
        </Popover>
      </Box>

      {hasError && (
        <InputError errorId={errorId}>{fieldState.error?.message}</InputError>
      )}
    </InputGroup>
  );
};

export { DatePickerCalendar };
