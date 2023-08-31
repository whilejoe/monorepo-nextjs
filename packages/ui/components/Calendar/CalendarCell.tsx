import { useRef } from "react";
import { calendarCell, disabledCell, selectedCell } from "./Calendar.css";
import { CalendarState } from "react-stately";
import { useCalendarCell } from "@react-aria/calendar";
import { isSameMonth, CalendarDate } from "@internationalized/date";
import clsx from "clsx";

interface CalendarCellProps {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}

const CalendarCell = ({ state, date, currentMonth }: CalendarCellProps) => {
  const ref = useRef(null);
  const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref);

  const isOutsideMonth = !isSameMonth(currentMonth, date);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideMonth}
        className={clsx(
          calendarCell,
          { [selectedCell]: isSelected },
          { [disabledCell]: isDisabled }
        )}
      >
        {formattedDate}
      </div>
    </td>
  );
};

export { CalendarCell };
