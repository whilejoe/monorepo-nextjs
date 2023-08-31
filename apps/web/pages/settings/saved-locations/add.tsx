import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import { AuthedLayout } from "components/AuthedLayout";
import { SavedLocation } from "components/SavedLocation";
import { SavedLocationLayout } from "components/SavedLocationLayout";
import { useTranslation } from "react-i18next";
import { PageTitle } from "components/PageTitle";

const AddLocationPage: NextPageWithLayout = () => {
  const { t } = useTranslation("settings");

  return (
    <>
      <PageTitle title={t("Saved Locations")} />
      <SavedLocation />
    </>
  );
};

AddLocationPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthedLayout fullMain>
      <SavedLocationLayout>{page}</SavedLocationLayout>
    </AuthedLayout>
  );
};

export default AddLocationPage;
