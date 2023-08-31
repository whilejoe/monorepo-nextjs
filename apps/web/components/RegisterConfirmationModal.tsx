import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "ui/components/Box";
import { Modal } from "ui/components/Modal";
import { Button } from "ui/components/Button";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterConfirmationModal = ({ open, setOpen }: Props) => {
  const { prefetch, replace } = useRouter();

  useEffect(() => {
    if (!open) return;
    prefetch("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      hideCloseButton
      justifyTitle="center"
      maxWidth={370}
      onOpenChange={setOpen}
      open={open}
      preventOutsideClose
      title="You're Registered!"
    >
      <Box as="p" textAlign="center" fontSize="sm">
        You are all set to schedule rides. You may explore the app from the
        homepage, or you may also set up Caregiver access.
      </Box>
      <Box as="p" mb="4x" textAlign="center" fontSize="sm">
        You may also set up caregivers in your account later.
      </Box>

      <Box mb="2.5x">
        <Button
          data-automation-hook="register-confirm-go-to-homepage-button"
          full
          onClick={() => {
            replace("/");
            setOpen(false);
          }}
        >
          Go to My Homepage
        </Button>
      </Box>
      <Box>
        <Button
          data-automation-hook="register-confirm-setup-caregivers-button"
          full
          onClick={() => {
            replace("/caregivers");
            setOpen(false);
          }}
          priority={2}
        >
          Set up Caregiver Access
        </Button>
      </Box>
    </Modal>
  );
};

export { RegisterConfirmationModal };
