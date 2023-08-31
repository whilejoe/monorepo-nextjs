import { useEffect } from "react";
import { AuthedLayout } from "components/AuthedLayout";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";
import { Loading } from "ui/components/Loading";
import { ErrorMessage } from "components/ErrorMessage";
import { useCaregiverGetUrl } from "hooks/useCaregiverGetUrl";

const ValidateCaregiverSMS: NextPageWithLayout = () => {
  const { mutate, isIdle, isError } = useCaregiverGetUrl();
  const { query, replace, isReady } = useRouter();
  const { id } = query;

  useEffect(() => {
    if (!isReady || !isIdle) return;

    mutate(id as string, {
      onSuccess: (data) => replace(data.url),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isIdle, id]);

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

ValidateCaregiverSMS.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthedLayout>{page}</AuthedLayout>;
};

export default ValidateCaregiverSMS;
