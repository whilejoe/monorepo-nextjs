import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { NextPageWithLayout } from "./_app";
import { useEffectOnce } from "ui/hooks/useEffectOnce";
import { AuthedLayout } from "components/AuthedLayout";
import { PageTitle } from "components/PageTitle";
import { RegisterCaregiver } from "components/RegisterCaregiver";
import { RegisterCaregiverConfirmation } from "components/RegisterCaregiverConfirmation";
import { useUser } from "hooks/useUser";

const RegisterCaregiverPage: NextPageWithLayout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: user } = useUser();
  const { replace } = useRouter();
  const { t } = useTranslation("register");

  // Evaluate only once at mount
  useEffectOnce(() => {
    // User has already registered as a caregiver or a patient
    if (!user?.isCaregiver || user?.isCaregiverRegistered || user?.isPatient) {
      replace("/");
    }
  });

  return (
    <>
      <PageTitle title={t("RegisterCaregiverTitle")} />
      <RegisterCaregiver setShowConfirmation={setShowConfirmation} />
      <RegisterCaregiverConfirmation
        open={showConfirmation}
        setOpen={setShowConfirmation}
      />
    </>
  );
};

RegisterCaregiverPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthedLayout>{page}</AuthedLayout>;
};

export default RegisterCaregiverPage;
