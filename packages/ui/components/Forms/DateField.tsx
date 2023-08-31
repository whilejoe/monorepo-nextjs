import { useRef } from "react";
import clsx from "clsx";
import { useDateField, useDateSegment } from "react-aria";
import {
  DateFieldState,
  useDateFieldState,
  DatePickerStateOptions,
} from "react-stately";
import { createCalendar, DateValue } from "@internationalized/date";
import { DateSegment as DateSegmentType } from "react-stately";
import { useTranslation } from "react-i18next";
import { Box } from "ui/components/Box";
import { inputBase, segmentField, segmentPlaceholder } from "./Forms.css";

interface DateFieldProps
  extends Omit<DatePickerStateOptions<DateValue>, "value"> {
  value: DateValue | null;
}

const DateField = (props: DateFieldProps) => {
  const { value, ...rest } = props;
  const ref = useRef(null);
  const locale =
    window.navigator.language.split("-")[0] ||
    window.navigator.language.split("-")[0];

  const state = useDateFieldState({
    ...rest,
    value: value as DateValue,
    locale,
    createCalendar,
  });

  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={inputBase}
      style={{ display: "flex", gap: 2 }}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
};

interface DateSegmentProps {
  segment: DateSegmentType;
  state: DateFieldState;
}

const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={clsx(segmentField, {
        [segmentPlaceholder]: segment.type === "literal",
      })}
    >
      <Box
        as="span"
        display="block"
        width="100%"
        textAlign="center"
        color="muted"
        aria-hidden="true"
        style={{
          visibility: segment.isPlaceholder ? undefined : "hidden",
          height: segment.isPlaceholder ? undefined : 0,
          pointerEvents: "none",
          fontStyle: "italic",
        }}
      >
        {segment.placeholder}
      </Box>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
};

export { DateField, DateSegment };
