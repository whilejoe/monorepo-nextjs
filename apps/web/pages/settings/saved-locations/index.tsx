import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "../../_app";
import { PageTitle } from "components/PageTitle";
import { AuthedLayout } from "components/AuthedLayout";
import { SavedLocationNavigation } from "components/SavedLocationNavigation";
import { useNamedLocations } from "hooks/useNamedLocations";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useUser } from "hooks/useUser";
import { Box } from "ui/components/Box";

const Settings: NextPageWithLayout = () => {
  const { data } = useNamedLocations();
  const isDesktop = useMediaQuery("md");
  const { replace } = useRouter();
  const { t } = useTranslation("common");
  const { data: user } = useUser();

  useEffect(() => {
    if (isDesktop) {
      if (data && data.length) {
        replace(`/settings/saved-locations/${data[0].id}`);
        return;
      }
      replace("/settings/saved-locations/add");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, data]);

  return (
    <>
      <PageTitle title={t("Settings")} />
      <Box pt={user?.actingAsPatient ? "5x" : undefined}>
        <SavedLocationNavigation />
      </Box>
    </>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <AuthedLayout fullMain>{page}</AuthedLayout>;
};

export default Settings;
