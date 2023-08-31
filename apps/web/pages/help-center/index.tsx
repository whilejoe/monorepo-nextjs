import { useTranslation } from "react-i18next";
import HelpCenter from "components/HelpCenter/HelpCenter";
import { PublicLayout } from "components/PublicLayout";
import { PageTitle } from "components/PageTitle";
import { NextPageWithLayout } from "../_app";

const HelpCenterPage: NextPageWithLayout = () => {
  const { t } = useTranslation("helpcenter");

  return (
    <>
      <PageTitle title={t("HelpCenterTitle")} />
      <HelpCenter />
    </>
  );
};

HelpCenterPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PublicLayout>{page}</PublicLayout>;
};

export default HelpCenterPage;
