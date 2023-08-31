import { DateValue, ZonedDateTime } from "@internationalized/date";

export const formatDateTime = (value: DateValue | null) => {
  if (value instanceof ZonedDateTime) {
    return value.toAbsoluteString();
  }

  if (value) {
    return value.toString();
  }

  return "";
};
