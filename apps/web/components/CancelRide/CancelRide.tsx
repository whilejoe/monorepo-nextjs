import { useState, useCallback } from "react";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { Modal } from "ui/components/Modal";
import { RideDetail, RideDetailProps } from "components/RideDetail";
import { Loading } from "ui/components/Loading";
import { useGlobalToast } from "ui/components/Toast";
import { useDeleteOrUpdateTrip } from "hooks/useDeleteTrip";
import { useTranslation } from "react-i18next";

export interface CancelRideProps extends RideDetailProps {
  tripId: string;
  trigger: React.ReactNode;
}

const CancelRide = ({ trigger, tripId, ...props }: CancelRideProps) => {
  const { mutate, isLoading } = useDeleteOrUpdateTrip();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useGlobalToast();
  const { t } = useTranslation("home");

  const onDelete = useCallback(() => {
    mutate(
      { id: tripId },
      {
        onSuccess: () => {
          setIsModalOpen(false);

          toast.add("cancelRideSuccess", {
            description: t("CancelRideSuccess"),
            kind: "success",
          });
        },
        onError: () => {
          setIsModalOpen(false);
          toast.add("cancelRideError", {
            description: t("CancelRideError"),
            kind: "danger",
          });
        },
      }
    );
  }, [mutate, tripId, toast, t]);

  return (
    <Modal
      maxWidth={420}
      onOpenChange={setIsModalOpen}
      open={isModalOpen}
      title={t("CancelRide")}
      trigger={trigger}
    >
      <RideDetail {...props} showPickupDetails />
      <Box mt="5x">
        <Button
          data-automation-hook="confirm-cancel-ride-submit-button"
          onClick={onDelete}
          full
        >
          {t("ConfirmCancellation")}
        </Button>
      </Box>
      <Loading show={isLoading} />
    </Modal>
  );
};

export { CancelRide };
