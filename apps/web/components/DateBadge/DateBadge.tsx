import { Box } from "ui/components/Box";
import { calendar, calendarHeader } from "./DateBadge.css";

interface DateBadgeProps {
  day: string;
  dayOfWeek: string;
  dense?: boolean;
  month: string;
}
const DateBadge = ({ day, dayOfWeek, dense, month }: DateBadgeProps) => {
  return (
    <div className={calendar}>
      <Box className={calendarHeader} fontSize={dense ? "xxs" : "xs"} px="3.5x">
        {dayOfWeek.substring(0, 3)}
      </Box>
      <Box display="flex" flexDirection="column" align="center" p="1x">
        <Box
          as="span"
          fontSize={dense ? "md" : "xl"}
          fontWeight="bold"
          lineHeight="1"
          style={{ marginBottom: 2 }}
        >
          {day}
        </Box>
        <Box
          as="span"
          fontSize={dense ? "xs" : "xs"}
          fontWeight="bold"
          lineHeight="1"
        >
          {month}
        </Box>
      </Box>
    </div>
  );
};

export { DateBadge };
