import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box } from "ui/components/Box";
import { Text } from "ui/components/Forms";
import { Button } from "ui/components/Button";
import { Loading } from "ui/components/Loading";
import { Toast } from "ui/components/Toast";
import { Card } from "components/Card";
import { useRegisterPatient, PatientNew } from "hooks/useRegisterPatient";
import { useAuth0User } from "hooks/useAuth0User";
import { useUser } from "hooks/useUser";
import { Modal } from "ui/components/Modal";
import { buttonLink } from "components/Schedule/Schedule.css";
import axios from "axios";
import { APIErrorResponse } from "hooks/useRequest";

interface PatientForm extends Omit<PatientNew, "dateOfBirth"> {
  day: string;
  month: string;
  year: string;
}

interface RegisterProps {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setShowConfirmation }: RegisterProps) => {
  const { user: auth0User } = useAuth0User();
  const { data: user } = useUser();
  const { mutate, isLoading, reset: resetMutation } = useRegisterPatient();

  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const { t } = useTranslation("register");
  const { t: common } = useTranslation("common");

  const { control, handleSubmit, reset } = useForm<PatientForm>({
    defaultValues: {
      day: "",
      email: user?.email || "", // Value may exist for registered caregivers
      firstName: user?.firstName || "", // Value may exist for registered caregivers
      lastName: user?.lastName || "", // Value may exist for registered caregivers
      memberId: "",
      month: "",
      postalCode: "",
      year: "",
    },
  });

  const onSubmit = useCallback(
    (formData: PatientForm) => {
      mutate(
        {
          allowCaregiverAccess: true,
          dateOfBirth: new Date(
            Date.UTC(
              Number(formData.year),
              Number(formData.month) - 1,
              Number(formData.day)
            )
          ).toISOString(),
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          memberId: formData.memberId,
          // Auth0 sms passwordless stores phone number as name
          phoneNumber: auth0User?.name || "",
          postalCode: formData.postalCode,
        },
        {
          onSuccess: () => {
            setShowConfirmation(true);
            reset();
          },
          onError: (error) => {
            if (
              axios.isAxiosError<APIErrorResponse>(error) &&
              error.response?.status! === 403
            ) {
              setIsEligibilityModalOpen(true);
            } else {
              setIsErrorOpen(true);
            }
          },
        }
      );
    },
    [mutate, reset, setShowConfirmation, auth0User?.name]
  );

  return (
    <>
      <Card position="relative" mx="auto" style={{ maxWidth: 480 }}>
        <Box as="h1" mb="3x" textAlign="center">
          {t("Register")}
        </Box>
        <Box as="p" textAlign="center">
          {t("RegisterInfo")}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text
            autoComplete="off"
            autoFocus
            control={control}
            enterKeyHint="next"
            label={t("MemberId")}
            name="memberId"
            rules={{ required: t("MemberIdRequired") }}
          />
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ sm: "2.5x" }}
          >
            <Box flex="1">
              <Text
                control={control}
                disabled={user?.isCaregiver} // Assume we don't want a caregiver registering as a patient to change
                enterKeyHint="next"
                label={t("FirstName")}
                name="firstName"
                rules={{ required: t("FirstNameRequired") }}
              />
            </Box>
            <Box flex="1">
              <Text
                control={control}
                disabled={user?.isCaregiver} // Assume we don't want a caregiver registering as a patient to change
                enterKeyHint="next"
                label={t("LastName")}
                name="lastName"
                rules={{ required: t("LastNameRequired") }}
              />
            </Box>
          </Box>
          {/* TODO: Make reusable and move to ui/components */}
          <Box
            as="fieldset"
            border="none"
            m="0x"
            p="0x"
            display="flex"
            flexDirection="column"
            minWidth="0"
            verticalAlign="top"
          >
            <Box
              as="legend"
              p="0x"
              pl="2x"
              mb="2x"
              ml="1x"
              fontSize="xs"
              color="muted"
              textTransform="uppercase"
            >
              {t("DateOfBirth")}
            </Box>
            <Box display="flex" gap="2x">
              <Box flexShrink="2">
                <Text
                  autoComplete="bday-month"
                  control={control}
                  enterKeyHint="next"
                  inputMode="numeric"
                  label={t("Month")}
                  name="month"
                  placeholder="MM"
                  rules={{
                    required: t("MonthRequired"),
                    pattern: {
                      value: /(^0?[1-9]$)|(^1[0-2]$)/,
                      message: t("MonthValidation"),
                    },
                  }}
                />
              </Box>
              <Box flexShrink="2">
                <Text
                  autoComplete="bday-day"
                  control={control}
                  enterKeyHint="next"
                  inputMode="numeric"
                  label={t("Day")}
                  name="day"
                  placeholder="DD"
                  rules={{
                    required: t("DayRequired"),
                    pattern: {
                      value: /^(0?[1-9]|[12]\d|3[01])$/,
                      message: t("DayValidation"),
                    },
                  }}
                />
              </Box>
              <Box flexShrink="2">
                <Text
                  autoComplete="bday-year"
                  control={control}
                  enterKeyHint="next"
                  inputMode="numeric"
                  label={t("Year")}
                  name="year"
                  placeholder="YYYY"
                  rules={{
                    required: t("YearRequired"),
                    pattern: {
                      value: /^\d{4}$/,
                      message: t("YearValidation"),
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Text
            autoComplete="email"
            control={control}
            disabled={user?.isCaregiver} // Assume we don't want a caregiver registering as a patient to change
            enterKeyHint="next"
            inputMode="email"
            label={t("Email")}
            name="email"
            rules={{ required: t("EmailRequired") }}
            type="email"
          />
          <Text
            autoComplete="postal-code"
            control={control}
            enterKeyHint="send"
            inputMode="numeric"
            label={t("ZipCode")}
            name="postalCode"
            rules={{ required: t("ZipCodeRequired") }}
          />

          <Button
            data-automation-hook="submit-register-form-button"
            full
            type="submit"
          >
            {t("Register")}
          </Button>
        </form>
        <Loading show={isLoading} />
      </Card>
      <Toast
        description={common("ErrorMessage")}
        kind="danger"
        open={isErrorOpen}
        setOpen={resetMutation}
        title={common("Error")}
      />
      <Modal
        maxWidth={380}
        onOpenChange={setIsEligibilityModalOpen}
        open={isEligibilityModalOpen}
        preventOutsideClose
        title={t("EligibilityModalTitle")}
      >
        <Box as="p">{t("EligibilityModalText")}</Box>
        <Box mb="2.5x">
          <Box
            className={buttonLink}
            as="a"
            color="background"
            href="tel:+18444277772"
          >
            <Button full>{t("EligibilityModalCall")}</Button>
          </Box>
        </Box>
        <Button
          full
          priority={2}
          onClick={() => setIsEligibilityModalOpen(false)}
        >
          {t("EligibilityModalProceed")}
        </Button>
      </Modal>
    </>
  );
};

export { Register };
