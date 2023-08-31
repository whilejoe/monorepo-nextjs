import { useTranslation } from "react-i18next";
import { Box } from "ui/components/Box";

interface RideStatusBadgeProps {
  priority: number;
  status: string;
}

const RideStatusBadge = ({ priority, status }: RideStatusBadgeProps) => {
  const { t } = useTranslation("common");
  return (
    <Box
      fontSize="xxs"
      fontWeight="bold"
      px="2.5x"
      py="1x"
      borderRadius="sm"
      display="inline-block"
      color={priority === 1 ? "background" : "text"}
      backgroundColor={priority === 1 ? "green9" : "gray6"}
    >
      {t(status)}
    </Box>
  );
};

export { RideStatusBadge };
