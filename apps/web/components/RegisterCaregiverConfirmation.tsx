import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Box } from "ui/components/Box";
import { Modal } from "ui/components/Modal";
import { Button } from "ui/components/Button";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterCaregiverConfirmation = ({ open, setOpen }: Props) => {
  const { prefetch, replace } = useRouter();
  const { t } = useTranslation("register");

  useEffect(() => {
    if (!open) return;
    prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      hideCloseButton
      justifyTitle="center"
      maxWidth={380}
      onOpenChange={setOpen}
      open={open}
      preventOutsideClose
      title={t("CaregiverConfirmationTitle")}
    >
      <Box as="p" textAlign="center" fontSize="sm">
        {t("CaregiverConfirmationMessage")}
      </Box>
      <Box as="p" mb="4x" textAlign="center" fontSize="sm">
        {t("CaregiverConfirmationInfo")}
      </Box>
      <Box mb="2.5x">
        <Button
          data-automation-hook="register-caregiver-confirm-go-to-homepage-button"
          full
          onClick={() => {
            replace("/");
            setOpen(false);
          }}
        >
          {t("CaregiverConfirmationCTAPrimary")}
        </Button>
      </Box>
      <Box>
        <Button
          data-automation-hook="register-caregiver-confirm-go-to-patient-registration-button"
          full
          onClick={() => {
            replace("/register-patient");
            setOpen(false);
          }}
          priority={2}
        >
          {t("CaregiverConfirmationCTASecondary")}
        </Button>
      </Box>
    </Modal>
  );
};

export { RegisterCaregiverConfirmation };
