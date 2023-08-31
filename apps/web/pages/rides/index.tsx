import { NextPageWithLayout } from "../_app";
import { AuthedLayout } from "components/AuthedLayout";
import { Rides } from "components/Rides";
import { PageTitle } from "components/PageTitle";
import { useTranslation } from "react-i18next";

const RidesPage: NextPageWithLayout = () => {
  const { t } = useTranslation("rides");
  return (
    <>
      <PageTitle title={t("Rides")} />
      <Rides />
    </>
  );
};

RidesPage.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthedLayout fullMain>{page}</AuthedLayout>;
};

export default RidesPage;
