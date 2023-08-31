import { ReactElement } from "react";
import { NextPageWithLayout } from "../../_app";
import { AuthedLayout } from "components/AuthedLayout";
import { SavedLocationLayout } from "components/SavedLocationLayout/SavedLocationLayout";
import { SavedLocation } from "components/SavedLocation";
import { useTranslation } from "react-i18next";
import { PageTitle } from "components/PageTitle";

const SavedLocationById: NextPageWithLayout = () => {
  const { t } = useTranslation("settings");

  return (
    <>
      <PageTitle title={t("Saved Locations")} />
      <SavedLocation />
    </>
  );
};

SavedLocationById.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthedLayout fullMain>
      <SavedLocationLayout>{page}</SavedLocationLayout>
    </AuthedLayout>
  );
};

export default SavedLocationById;
