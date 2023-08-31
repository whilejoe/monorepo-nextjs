import { useEffect } from "react";
import { AuthedLayout } from "components/AuthedLayout";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";
import { Loading } from "ui/components/Loading";
import { PageTitle } from "components/PageTitle";
import { ErrorMessage } from "components/ErrorMessage";
import { useValidateCaregiverInvite } from "hooks/useValidateCaregiverInvite";
import { useUser } from "hooks/useUser";

const ValidateCaregiver: NextPageWithLayout = () => {
  const { data: user } = useUser();
  const { mutate, isIdle, isError } = useValidateCaregiverInvite();
  const { query, replace, isReady } = useRouter();
  const { code, phone, email } = query;

  const isRegistered = user?.isCaregiverRegistered || user?.isPatient;

  useEffect(() => {
    if (!isReady || !isIdle) return;

    mutate(
      {
        caregiverCode: code as string,
        caregiverPhoneNumber: phone as string,
        caregiverEmail: email as string,
      },
      {
        onSuccess: () => {
          if (isRegistered) {
            return replace("/select-access");
          }

          replace("/register-caregiver");
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, email, isReady, isIdle, isRegistered]);

  if (isError) {
    return (
      <ErrorMessage>
        Your invite to register as a caregiver is expired or invalid.
        <br />
        Please request a new one from the patient whom invited you.
      </ErrorMessage>
    );
  }

  return <Loading show size="lg" />;
};

ValidateCaregiver.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AuthedLayout>
      <PageTitle title="Validate Invite" />
      {page}
    </AuthedLayout>
  );
};

export default ValidateCaregiver;
