import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Box } from "ui/components/Box";
import { Text } from "ui/components/Forms";
import { Button } from "ui/components/Button";
import { Loading } from "ui/components/Loading";
import { Toast } from "ui/components/Toast";
import { Card } from "components/Card";
import { useUser } from "hooks/useUser";
import { useRegisterCaregiver, CaregiverNew } from "hooks/useRegisterCaregiver";

type CaregiverForm = CaregiverNew;

interface RegisterProps {
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterCaregiver = ({ setShowConfirmation }: RegisterProps) => {
  const { data: user } = useUser();
  const {
    mutate,
    isLoading,
    reset: resetMutation,
    isError,
  } = useRegisterCaregiver();

  const { t } = useTranslation("register");
  const { t: common } = useTranslation("common");

  const { control, handleSubmit, reset } = useForm<CaregiverForm>({
    defaultValues: {
      email: user?.email || "", // Pre-populate with email from the caregiver's invite
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = useCallback(
    (formData: CaregiverForm) => {
      mutate(
        {
          ...user,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        {
          onSuccess: () => {
            setShowConfirmation(true);
            reset();
          },
        }
      );
    },
    [mutate, reset, setShowConfirmation, user]
  );

  return (
    <>
      <Card position="relative" mx="auto" style={{ maxWidth: 450 }}>
        <Box as="h1" mb="3x" textAlign="center">
          {t("RegisterCaregiverTitle")}
        </Box>
        <Box as="p" textAlign="center">
          {t("RegisterCaregiverInfo")}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text
            autoFocus
            control={control}
            enterKeyHint="next"
            label={t("FirstName")}
            name="firstName"
            rules={{ required: t("FirstNameRequired") }}
          />
          <Text
            control={control}
            enterKeyHint="next"
            label={t("LastName")}
            name="lastName"
            rules={{ required: t("LastNameRequired") }}
          />
          <Text
            autoComplete="email"
            control={control}
            enterKeyHint="next"
            inputMode="email"
            label={t("Email")}
            name="email"
            rules={{ required: t("EmailRequired") }}
            type="email"
          />
          <Button
            data-automation-hook="submit-register-caregiver-form-button"
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
        open={isError}
        setOpen={resetMutation}
        title={common("Error")}
      />
    </>
  );
};

export { RegisterCaregiver };
