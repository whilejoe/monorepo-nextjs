import { Box } from "ui/components/Box";
import { useUser } from "hooks/useUser";
import { banner, bannerContainer } from "./ActingPatientBanner.css";
import { useTranslation } from "react-i18next";

const ActingPatientBanner = () => {
  const { data } = useUser();
  const { t } = useTranslation("common");

  if (!data?.actingAsPatient) return null;

  return (
    <div className={bannerContainer} role="alert">
      <div className={banner}>
        {t("ActingAsPatient")}:{" "}
        <Box as="span" fontWeight="bold">
          {data.actingAsPatient.firstName} {data.actingAsPatient.lastName}
        </Box>
      </div>
    </div>
  );
};

export { ActingPatientBanner };
