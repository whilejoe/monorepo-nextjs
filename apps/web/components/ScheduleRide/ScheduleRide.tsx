import { UseFormReturn, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { DatePickerCalendar } from "ui/components/DatePickerCalendar";
import { Text, Select, SelectOption, fieldLabel } from "ui/components/Forms";
import { LocationSearch, LocationSearchValue } from "components/LocationSearch";
import { RadioGroup, RadioGroupItem } from "ui/components/RadioGroup";
import {
  ProgressContainer,
  ProgressLine,
  ProgressStep,
} from "components/Progress";
import { useLevelsOfService } from "hooks/useLevelsOfService";
import { useTripReasons } from "hooks/useTripReasons";
import { footer, form, preventScroll } from "./ScheduleRide.css";
import { Location } from "models/Location";
import { HOURS, MINUTES } from "constants/timeVars";

export interface TripForm {
  tripReason: string;
  levelOfService: string;
  pickupDate: CalendarDate | null;
  pickupHour: string;
  pickupMinute: string;
  start: LocationSearchValue;
  end: LocationSearchValue;
  numAdditionalPassengers: string;
}

interface ScheduleRideProps extends UseFormReturn<TripForm> {
  amPm: string;
  caregiverFullAccess?: boolean;
  endingLocation?: Location | null;
  isDesktop?: boolean;
  isRescheduleMode: boolean;
  onSelectAmPm: React.Dispatch<React.SetStateAction<string>>;
  onSelectStart: (suggestion: LocationSearchValue) => void;
  onSelectEnd: (suggestion: LocationSearchValue) => void;
  onSubmit: SubmitHandler<TripForm>;
  closeDrawer: (open: boolean) => void;
  startingLocation?: Location | null;
}

const isLocationValid = (location?: Location | null) =>
  !location?.address.includes("undefined");

const ScheduleRide = ({
  amPm,
  caregiverFullAccess = false,
  control,
  closeDrawer,
  endingLocation,
  handleSubmit,
  isDesktop,
  isRescheduleMode,
  onSelectAmPm,
  onSelectStart,
  onSelectEnd,
  onSubmit,
  startingLocation,
  watch,
}: ScheduleRideProps) => {
  const minDate = today(getLocalTimeZone()).add({ days: 1 });
  const maxDate = minDate.add({ days: 29 });
  const [start, end] = watch(["start", "end"]);
  const { data: tripReasons } = useTripReasons();
  const { data: levelsOfService } = useLevelsOfService();

  const { t } = useTranslation("home");

  return (
    <form className={form} onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" gap="2.5x">
        <ProgressContainer
          flex="1"
          style={{ maxWidth: "7px" }}
          mr="1x"
          mt="2.5x"
          mb="6x"
          ml="-1x"
        >
          <ProgressStep active={!!end} />
          <ProgressLine active={!!end && !!start} />
          <ProgressStep active={!!start} />
        </ProgressContainer>

        <Box flex="1">
          <LocationSearch
            autoFocus
            control={control}
            id="destination"
            label={t("DestinationLabel")}
            name="end"
            onSelect={onSelectEnd}
            placeholder={t("DestinationPlaceholder")}
            rules={{
              required: `${t("DestinationRequired")}`,
              validate: {
                value: () =>
                  isLocationValid(endingLocation) || `${t("InvalidLocation")}`,
              },
            }}
          />

          <LocationSearch
            control={control}
            className={preventScroll}
            id="pickup"
            label={t("PickupLabel")}
            name="start"
            onSelect={onSelectStart}
            placeholder={t("PickupPlaceholder")}
            rules={{
              required: `${t("PickupRequired")}`,
              validate: {
                value: () =>
                  isLocationValid(startingLocation) ||
                  `${t("InvalidLocation")}`,
              },
            }}
          />
        </Box>
      </Box>
      <DatePickerCalendar
        control={control}
        granularity="day"
        id="pickupDate"
        label={t("PickupDateLabel")}
        minValue={minDate}
        maxValue={maxDate}
        name="pickupDate"
        rules={{
          required: "Date required",
          min: {
            value: minDate.toString(),
            message: `${t("PickupTimeMin")}`,
          },
          max: {
            value: maxDate.toString(),
            message: `${t("PickupTimeMax")}`,
          },
        }}
      />
      <span className={fieldLabel}>{t("PickupTimeLabel")}</span>
      <Box display="flex" alignItems="center" gap="2x">
        <Select
          control={control}
          hideLabel
          inputId="pickupHour"
          label="Hour"
          name="pickupHour"
          placeholder="Time"
          rules={{
            required: "Time Required",
          }}
        >
          {HOURS.map((h) => (
            <SelectOption key={h.key} value={h.value}>
              {h.key}
            </SelectOption>
          ))}
        </Select>
        <Box mb="4x">:</Box>
        <Select
          control={control}
          hideLabel
          inputId="pickupMinute"
          label="Minute"
          name="pickupMinute"
          placeholder="Time"
          rules={{
            required: "Time Required",
          }}
        >
          {MINUTES.map((m) => (
            <SelectOption key={m.key} value={m.value}>
              {m.key}
            </SelectOption>
          ))}
        </Select>
        <Box mb="4x" ml="2x">
          <RadioGroup
            value={amPm}
            defaultValue={amPm}
            onValueChange={(v: string) => onSelectAmPm(v)}
          >
            <RadioGroupItem label="AM" value="AM" id="AM" />
            <RadioGroupItem label="PM" value="PM" id="PM" />
          </RadioGroup>
        </Box>
      </Box>
      <Select
        control={control}
        // disabled={isRescheduleMode}
        inputId="tripReason"
        // placeholder={t("ReasonLabel")}
        label={t("ReasonLabel")}
        name="tripReason"
        rules={{
          required: !isRescheduleMode && `${t("ReasonRequired")}`,
        }}
      >
        {tripReasons?.map((r) => (
          <SelectOption key={r.id} value={r.name}>
            {r.name}
          </SelectOption>
        ))}
      </Select>
      <Select
        control={control}
        // disabled={isRescheduleMode}
        inputId="levelOfService"
        // placeholder={t("NeedsLabel")}
        label={t("NeedsLabel")}
        name="levelOfService"
        rules={{
          required: !isRescheduleMode && `${t("NeedsRequired")}`,
        }}
      >
        {levelsOfService?.map((r) => (
          <SelectOption key={r.code} value={r.code}>
            {r.name}
          </SelectOption>
        ))}
      </Select>

      <Text
        control={control}
        disabled={isRescheduleMode}
        enterKeyHint="next"
        inputMode="numeric"
        label={t("PassengersLabel")}
        name="numAdditionalPassengers"
        rules={
          isRescheduleMode
            ? undefined
            : {
                pattern: {
                  value: /^\+?(0|[1-9]\d*)$/,
                  message: `${t("PassengersRequired")}`,
                },
              }
        }
      />

      <div className={footer}>
        <Button
          disabled={!caregiverFullAccess}
          full
          size={isDesktop ? "md" : "lg"}
          type="submit"
        >
          {isRescheduleMode ? t("Reschedule") : t("Schedule")}
        </Button>
      </div>
    </form>
  );
};

export { ScheduleRide };
