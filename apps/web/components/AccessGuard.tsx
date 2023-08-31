import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Loading } from "ui/components/Loading";
import { useUser } from "hooks/useUser";

type Props = {
  children?: React.ReactNode;
};

const AccessGuard = ({ children }: Props) => {
  const [authorized, setAuthorized] = useState(false);
  const { data: user } = useUser();
  const { replace } = useRouter();

  useEffect(() => {
    // User is either a patient or a registered caregiver acting as a patient
    if (user?.hasPatientAccess) {
      setAuthorized(true);
      return;
    }

    // User is an admin but hasn't selected a patient to access
    if (user?.isAdmin) {
      setAuthorized(false);
      replace("/admin");
      return;
    }

    // User has validated their invite to be a caregiver but has not completed their registration
    if (user?.isCaregiver && !user.isCaregiverRegistered) {
      setAuthorized(false);
      replace("/register-caregiver");
      return;
    }

    // User has registered as a caregiver but has not selected a patient to act on behalf of
    if (user?.isCaregiverRegistered && !user?.actingAsPatient) {
      setAuthorized(false);
      replace("/select-access");
      return;
    }

    // User is neither a patient or a caregiver - default to patient registration
    setAuthorized(false);
    replace("/register-patient");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return authorized ? <>{children}</> : <Loading show size="lg" />;
};

export { AccessGuard };
