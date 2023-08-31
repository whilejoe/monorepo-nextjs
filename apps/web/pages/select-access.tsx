import { useCallback } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "./_app";
import { Box } from "ui/components/Box";
import { AuthedLayout } from "components/AuthedLayout";
import { PageTitle } from "components/PageTitle";
import { Card } from "components/Card";
import { CaregiverPatients } from "components/CaregiverPatients";
import { useTranslation } from "react-i18next";

const SelectAccess: NextPageWithLayout = () => {
  const { push } = useRouter();
  const { t } = useTranslation("selectaccess");

  const handleOnSelected = useCallback(() => push("/"), [push]);

  return (
    <>
      <PageTitle title={t("SelectAccessHeader")} />
      <Card position="relative" mx="auto" style={{ maxWidth: 500 }}>
        <Box as="h1" mb="3x" textAlign="center">
          {t("SelectAccessHeader")}
        </Box>
        <CaregiverPatients onSelected={handleOnSelected} />
      </Card>
    </>
  );
};

SelectAccess.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthedLayout>{page}</AuthedLayout>;
};

export default SelectAccess;
