import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import { PageTitle } from "components/PageTitle";
import { SettingsNavigation } from "components/SettingsNavigation";
import { AuthedLayout } from "components/AuthedLayout";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Box } from "ui/components/Box";
import { useUser } from "hooks/useUser";

const Settings: NextPageWithLayout = () => {
  const isDesktop = useMediaQuery("md");
  const { replace } = useRouter();
  const { t } = useTranslation("common");
  const { data: user } = useUser();

  useEffect(() => {
    if (isDesktop) {
      replace("/settings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  return (
    <>
      <PageTitle title={t("Settings")} />
      <Box pt={user?.actingAsPatient ? "5x" : undefined}>
        <SettingsNavigation />
      </Box>
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <AuthedLayout fullMain>{page}</AuthedLayout>;
};

export default Settings;
