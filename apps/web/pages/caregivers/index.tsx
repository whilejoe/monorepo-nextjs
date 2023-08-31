import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPageWithLayout } from "pages/_app";
import { Button } from "ui/components/Button";
import { Box } from "ui/components/Box";
import { Checkbox } from "ui/components/Checkbox";
import { Loading } from "ui/components/Loading";
import { Modal } from "ui/components/Modal";
import { inputError, Select, SelectOption } from "ui/components/Forms";
import { Text } from "ui/components/Forms";
import { Toast } from "ui/components/Toast";
import { AuthedRestrictedLayout } from "components/AuthedRestrictedLayout";
import { CaregiverList } from "components/CaregiverList";
import { InvitedCaregiverList } from "components/InvitedCaregiverList";
import { Card } from "components/Card";
import { PageTitle } from "components/PageTitle";
import {
  useInviteCaregiver,
  CaregiverInviteNew,
} from "hooks/useCaregiverInvite";
import { useUser } from "hooks/useUser";
import { useTranslation } from "react-i18next";

const Caregivers: NextPageWithLayout = () => {
  const [open, setOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(true);
  const [isSmsChecked, setIsSmsChecked] = useState(false);
  const { data: user } = useUser();
  const inviteMutation = useInviteCaregiver();
  const { t } = useTranslation("caregivers");
  const { t: common } = useTranslation("common");

  const { handleSubmit, control, reset } = useForm<CaregiverInviteNew>({
    defaultValues: {
      caregiverEmail: "",
      caregiverPhoneNumber: "",
      typeOfAccess: "ViewOnly",
    },
  });

  const handleOnOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      // Ensure clean form state when opening
      if (isOpen) {
        reset();
        setIsEmailChecked(true);
        setIsSmsChecked(false);
      }
    },
    [reset]
  );

  const onSubmit = (formData: CaregiverInviteNew) => {
    if (!isEmailChecked && !isSmsChecked) return;
    inviteMutation.mutate(
      [
        {
          caregiverEmail: isEmailChecked ? formData.caregiverEmail : "",
          caregiverPhoneNumber: isSmsChecked
            ? "+1" + formData.caregiverPhoneNumber.replace(/[^0-9]/g, "")
            : "",
          typeOfAccess: formData.typeOfAccess,
        },
      ],
      {
        onSuccess: () => {
          handleOnOpenChange(false); // Close modal
          setInviteSuccess(true);
        },
        onError: () => setInviteError(true),
      }
    );
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
        gap="3x"
        mb="4x"
      >
        <Box as="h1" mb="0x">
          {t("CaregiversHeader")}
        </Box>
        {user?.caregiverFullAccess && (
          <Modal
            maxWidth={385}
            onOpenChange={handleOnOpenChange}
            open={open}
            title={t("InviteCaregiver")}
            trigger={<Button priority={2}>{t("AddCaregiverButton")}</Button>}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box pt="1x" pb="2x">
                <Box mb="4x" position="relative">
                  <Box display="flex" gap="3x" pb="1x">
                    <Checkbox
                      label="Email"
                      id="Email"
                      onCheckedChange={() => setIsEmailChecked(!isEmailChecked)}
                      checked={isEmailChecked}
                    />
                    <Checkbox
                      label="SMS"
                      id="SMS"
                      onCheckedChange={() => setIsSmsChecked(!isSmsChecked)}
                      checked={isSmsChecked}
                    />
                  </Box>
                  {!isEmailChecked && !isSmsChecked && (
                    <span aria-live="polite" className={inputError}>
                      {t("InviteOptionRequired")}
                    </span>
                  )}
                </Box>
                {isEmailChecked && (
                  <Text
                    autoFocus
                    control={control}
                    inputMode="email"
                    label={t("Email")}
                    name="caregiverEmail"
                    rules={{ required: t("EmailRequired") }}
                    type="email"
                  />
                )}
                {isSmsChecked && (
                  <Text
                    control={control}
                    inputMode="tel"
                    label={t("PhoneNumber")}
                    name="caregiverPhoneNumber"
                    inputHint="555 555 0123"
                    rules={{
                      required: t("PhoneNumberRequired"),
                      validate: {
                        value: (value) =>
                          value.replace(/[^0-9]/g, "").length === 10
                            ? true
                            : t("PhoneNumberValidation"),
                      },
                    }}
                    type="tel"
                  />
                )}
                <Select
                  control={control}
                  inputId="typeOfAccess"
                  name="typeOfAccess"
                  label={t("LevelOfAccess")}
                  rules={{ required: t("LevelOfAccessRequired") }}
                >
                  <SelectOption value="ViewOnly">
                    {t("AccessTypeViewOnly")}
                  </SelectOption>
                  <SelectOption value="FullAccess">
                    {t("AccessTypeFullAccess")}
                  </SelectOption>
                </Select>
              </Box>
              <Box display="flex" gap="2.5x">
                <Box flex="1">
                  <Button
                    data-automation-hook="caregiver-invite-cancel-button"
                    full
                    onClick={() => handleOnOpenChange(false)}
                    priority={2}
                    type="button"
                  >
                    {common("Cancel")}
                  </Button>
                </Box>
                <Box flex="1">
                  <Button
                    data-automation-hook="caregiver-invite-submit-button"
                    full
                    type="submit"
                  >
                    {common("Add")}
                  </Button>
                </Box>
              </Box>
            </form>
            <Loading show={inviteMutation.isLoading} size="md" />
          </Modal>
        )}
      </Box>

      <Card mb="6x" py="3x">
        <CaregiverList />
      </Card>

      <Box as="h2">{t("PendingInvitesHeader")}</Box>
      <Card py="3x">
        <InvitedCaregiverList />
      </Card>

      <Toast
        description={t("InviteSuccess")}
        kind="success"
        open={inviteSuccess}
        setOpen={setInviteSuccess}
        title={common("Success")}
      />
      <Toast
        description={t("InviteError")}
        kind="danger"
        open={inviteError}
        setOpen={setInviteError}
        title={common("Error")}
      />
    </>
  );
};

Caregivers.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthedRestrictedLayout>
      <PageTitle title="Caregivers" />
      {page}
    </AuthedRestrictedLayout>
  );
};

export default Caregivers;
