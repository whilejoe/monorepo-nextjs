import { useRouter } from "next/router";
import { MdChevronRight } from "react-icons/md";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { Table, Th, Td, cellAction } from "ui/components/Table";
import { VisuallyHidden } from "ui/components/VisuallyHidden";
import { useCaregivers } from "hooks/useCaregivers";
import { useTranslation } from "react-i18next";

const CaregiverList = () => {
  const { data } = useCaregivers();
  const { push } = useRouter();
  const { t } = useTranslation("caregivers");

  if (!data?.length) {
    return (
      <Box as="p" mb="0x" color="muted" textAlign="center" fontSize="sm">
        {t("NoCaregivers")}
      </Box>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>{t("Name")}</Th>
          <Th>{t("AccessType")}</Th>
          <Th textAlign="center">
            <VisuallyHidden>{t("ViewCaregiverAction")}</VisuallyHidden>
          </Th>
        </tr>
      </thead>
      <tbody>
        {data?.map((c) => (
          <tr key={c.caregiverId}>
            <Td>
              <Box as="span" fontWeight="bold">
                {c.fullName}
              </Box>
            </Td>
            <Td>{t(`AccessType${c.typeOfAccess}`)}</Td>
            <Td textAlign="center">
              <Button
                className={cellAction}
                data-automation-hook="view-caregiver-details-button"
                onClick={() =>
                  push({
                    pathname: "/caregivers/[id]",
                    query: { id: c.caregiverId },
                  })
                }
                priority={2}
                round
                size="sm"
              >
                <AccessibleIcon
                  label={`${t("ViewCaregiverIconLabel", {
                    name: c.fullName,
                  })}`}
                  icon={<MdChevronRight size={18} />}
                />
              </Button>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export { CaregiverList };
