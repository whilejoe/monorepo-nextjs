import { useCallback } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { parseDate, CalendarDate } from "@internationalized/date";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { Text } from "ui/components/Forms";
import { DatePicker } from "ui/components/DatePicker";
import { Card } from "components/Card";
import { MembersList } from "components/MembersList";
import { stripSpecialCharacters } from "utils/phoneNumber";
import { MemberSearchFields, MemberSearchQuery } from "models/Member";
import { searchContainer, resetButton } from "./Dashboard.css";

interface MemberSearchForm extends Omit<MemberSearchFields, "dateOfBirth"> {
  dateOfBirth: CalendarDate | null;
}

const Dashboard = () => {
  const router = useRouter();
  const { replace } = router;
  const query = router.query as MemberSearchQuery;
  const { t } = useTranslation("members");

  const { control, formState, handleSubmit, reset } = useForm<MemberSearchForm>(
    {
      defaultValues: {
        firstName: query.firstName || "",
        lastName: query.lastName || "",
        memberId: query.memberId || "",
        dateOfBirth: query.dateOfBirth ? parseDate(query.dateOfBirth) : null,
        phoneNumber: query.phoneNumber || "",
      },
    }
  );

  const handleOnSubmit = useCallback(
    (formData: MemberSearchForm) => {
      const validParams = Object.entries(formData).reduce<MemberSearchQuery>(
        (acc, [key, value]) => {
          if (!value) return acc;

          if (key === "dateOfBirth") {
            acc[key] = value.toString();
          } else if (key === "phoneNumber") {
            acc[key] = stripSpecialCharacters(value);
          } else {
            acc[key] = value;
          }

          return acc;
        },
        {}
      );

      replace({ query: validParams }, undefined, { shallow: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleOnReset = useCallback(
    () => {
      reset({
        firstName: "",
        lastName: "",
        memberId: "",
        dateOfBirth: null,
        phoneNumber: "",
      });
      replace({ query: {} }, undefined, { shallow: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reset]
  );

  return (
    <Box display="flex" gap="3.5x" flexDirection={{ xs: "column", md: "row" }}>
      <div className={searchContainer}>
        <h2>{t("MemberSearchHeading")}</h2>
        <Card position="relative" px="3.5x">
          {(formState.isDirty || Object.keys(query).length > 0) && (
            <Button
              data-automation-hook="member-search-reset-form"
              className={resetButton}
              kind="muted"
              onClick={handleOnReset}
              priority={3}
              round
              size="sm"
            >
              <AccessibleIcon
                label="Reset form"
                icon={<MdOutlineClose size={20} />}
              />
            </Button>
          )}
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Text
              autoFocus
              control={control}
              enterKeyHint="next"
              label={t("FormLabelFirstName")}
              name="firstName"
            />
            <Text
              control={control}
              enterKeyHint="next"
              label={t("FormLabelLastName")}
              name="lastName"
            />
            <Text
              autoComplete="off"
              control={control}
              enterKeyHint="next"
              label={t("FormLabelMemberID")}
              name="memberId"
            />
            <DatePicker
              control={control}
              id="pickupTime"
              label={t("FormLabelDOB")}
              name="dateOfBirth"
              granularity="day"
            />
            <Text
              autoComplete="off"
              control={control}
              enterKeyHint="next"
              label={t("FormLabelPhoneNumber")}
              name="phoneNumber"
            />
            <Button
              data-automation-hook="submit-member-search-form-button"
              full
              type="submit"
            >
              {t("FormActionPrimary")}
            </Button>
          </form>
        </Card>
      </div>

      <Box display="flex" flexDirection="column" flex="1" minWidth="0">
        <h2>{t("MembersHeading")}</h2>
        <Card position="relative" px="3.5x" py="2x" flex="1">
          <MembersList />
        </Card>
      </Box>
    </Box>
  );
};

export { Dashboard };
