import { Table, Th, Td } from "ui/components/Table";
import { Box } from "ui/components/Box";
import { useInvitedCaregivers } from "hooks/useInvitedCaregivers";
import { useTranslation } from "react-i18next";

const InvitedCaregiverList = () => {
  const { data } = useInvitedCaregivers();
  const { t } = useTranslation("caregivers");

  if (!data?.length) {
    return (
      <Box as="p" mb="0x" color="muted" textAlign="center" fontSize="sm">
        {t("NoPendingInvites")}
      </Box>
    );
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>{t("Email")}</Th>
          <Th>{t("PhoneNumber")}</Th>
          <Th>{t("AccessType")}</Th>
        </tr>
      </thead>
      <tbody>
        {data?.map((c) => (
          <tr key={c.createDateTime}>
            <Td>
              <Box as="span" fontWeight="bold">
                {c.caregiverEmail}
              </Box>
            </Td>
            <Td>
              <Box as="span" fontWeight="bold">
                {c.caregiverPhoneNumber}
              </Box>
            </Td>
            <Td>{t(`AccessType${c.typeOfAccess}`)}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export { InvitedCaregiverList };
