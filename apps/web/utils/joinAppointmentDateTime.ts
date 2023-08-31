import {
  CalendarDate,
  toCalendarDateTime,
  Time,
  toZoned,
  getLocalTimeZone,
} from "@internationalized/date";

/**
 * Joins date and time inputs from the schedule form and returns one UTC string
 */
export const joinAppointmentDateTime = (
  date: CalendarDate | null,
  hour: number,
  minute: number,
  amPm: string
): string => {
  if (!date) return "";

  const calendarDateTime = toCalendarDateTime(
    date,
    new Time(amPm === "AM" ? hour : hour + 12, minute)
  );

  const dateTime = toZoned(calendarDateTime, getLocalTimeZone());
  return dateTime.toAbsoluteString();
};
