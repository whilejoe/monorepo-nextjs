import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { NextPageWithLayout } from "./_app";
import { useEffectOnce } from "ui/hooks/useEffectOnce";
import { AuthedLayout } from "components/AuthedLayout";
import { PageTitle } from "components/PageTitle";
import { Register } from "components/Register";
import { RegisterConfirmationModal } from "components/RegisterConfirmationModal";
import { useUser } from "hooks/useUser";

const RegisterPatientPage: NextPageWithLayout = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: user } = useUser();
  const { replace } = useRouter();
  const { t } = useTranslation("register");

  // Evaluate only once at mount
  useEffectOnce(() => {
    // User has already registered as a patient
    if (user?.isPatient) {
      replace("/");
    }
  });

  return (
    <>
      <PageTitle title={t("Register")} />
      <Register setShowConfirmation={setShowConfirmation} />
      <RegisterConfirmationModal
        open={showConfirmation}
        setOpen={setShowConfirmation}
      />
    </>
  );
};

RegisterPatientPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthedLayout>{page}</AuthedLayout>;
};

export default RegisterPatientPage;
