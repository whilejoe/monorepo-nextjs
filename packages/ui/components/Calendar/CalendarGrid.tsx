import { getWeeksInMonth, endOfMonth } from "@internationalized/date";
import { useCalendarGrid } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { CalendarState } from "@react-stately/calendar";
import { Box } from "../Box";
import { CalendarCell } from "./CalendarCell";

interface CalendarGridProps {
  state: CalendarState;
  offset?: any;
}

const CalendarGrid = ({ state, offset = {} }: CalendarGridProps) => {
  const { locale } = useLocale();
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state
  );

  return (
    <table {...gridProps} cellPadding="0" style={{ flex: "1" }}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <Box
              key={index}
              as="th"
              fontSize="sm"
              fontWeight="xbold"
              lineHeight="dense"
            >
              {day}
            </Box>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(getWeeksInMonth(startDate, locale)).keys()).map(
          (weekIndex) => (
            <tr key={weekIndex}>
              {state
                .getDatesInWeek(weekIndex, startDate)
                .map((date, i) =>
                  date ? (
                    <CalendarCell
                      key={i}
                      state={state}
                      date={date}
                      currentMonth={startDate}
                    />
                  ) : (
                    <td key={i} />
                  )
                )}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export { CalendarGrid };
