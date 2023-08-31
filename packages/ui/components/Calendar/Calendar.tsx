import { Box } from "../Box";
import { Button } from "../Button";
import { CalendarGrid } from "./CalendarGrid";
import { createCalendar, DateValue } from "@internationalized/date";
import { CalendarProps, useDateFormatter, VisuallyHidden } from "react-aria";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import {
  calendarHeading,
  monthButtonPrev,
  monthButtonNext,
} from "./Calendar.css";

const Calendar = (props: CalendarProps<DateValue>) => {
  const { locale } = useLocale();
  const isDesktop = useMediaQuery("md");
  const state = useCalendarState({
    ...props,
    visibleDuration: { months: isDesktop ? 2 : 1 },
    locale,
    createCalendar,
  });

  const monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  return (
    <Box position="relative" {...calendarProps}>
      {!isDesktop && (
        <>
          <Button
            className={monthButtonPrev}
            disabled={prevButtonProps.isDisabled}
            onClick={state.focusPreviousPage}
            priority={2}
            round
            size="sm"
          >
            <AccessibleIcon label={`left`} icon={<MdChevronLeft size={18} />} />
          </Button>

          <Button
            className={monthButtonNext}
            disabled={nextButtonProps.isDisabled}
            onClick={state.focusNextPage}
            priority={2}
            round
            size="sm"
          >
            <AccessibleIcon
              label={`right`}
              icon={<MdChevronRight size={18} />}
            />
          </Button>
        </>
      )}

      <Box display="flex" gap="2.5x">
        <VisuallyHidden>
          <h2>{calendarProps["aria-label"]}</h2>
        </VisuallyHidden>
        <div>
          <div className={calendarHeading} aria-hidden>
            {monthDateFormatter.format(
              state.visibleRange.start.toDate(state.timeZone)
            )}
          </div>
          <CalendarGrid state={state} />
        </div>

        {isDesktop && (
          <div>
            <div className={calendarHeading} aria-hidden>
              {monthDateFormatter.format(
                state.visibleRange.start
                  .add({ months: 1 })
                  .toDate(state.timeZone)
              )}
            </div>
            <CalendarGrid state={state} offset={{ months: 1 }} />
          </div>
        )}
      </Box>
    </Box>
  );
};

export { Calendar };
