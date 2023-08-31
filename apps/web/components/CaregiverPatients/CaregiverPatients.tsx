import { useTranslation } from "react-i18next";
import { MdChevronRight } from "react-icons/md";
import { Button } from "ui/components/Button";
import { Table, Th, Td, cellAction } from "ui/components/Table";
import { VisuallyHidden } from "ui/components/VisuallyHidden";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Loading } from "ui/components/Loading";
import { Box } from "ui/components/Box";
import { Toast } from "ui/components/Toast";
import { useUser } from "hooks/useUser";
import { useCaregiverPatients } from "hooks/useCaregiverPatients";
import {
  useCaregiverAsPatient,
  CaregiverAsPatient,
} from "hooks/useCaregiverAsPatient";
import { useRouter } from "next/router";

type CaregiverPatientsProps = {
  onSelected?: () => void;
};

const CaregiverPatients = ({ onSelected }: CaregiverPatientsProps) => {
  const { data } = useCaregiverPatients();
  const { data: user } = useUser();
  const {
    mutate,
    isLoading,
    isError,
    reset: resetMutation,
  } = useCaregiverAsPatient();
  const { push } = useRouter();

  const { t } = useTranslation("selectaccess");
  const { t: common } = useTranslation("common");

  const handleSelectPatient = (id: CaregiverAsPatient["id"]) => {
    mutate({ id }, { onSuccess: onSelected });
  };

  const handleRegisterPatient = (id: CaregiverAsPatient["id"]) => {
    mutate(
      { id },
      {
        onSuccess: () => {
          push("/register-patient");
        },
      }
    );
  };

  return (
    <>
      {!data?.length && (
        <Box as="p" color="muted" textAlign="center" fontSize="sm">
          {t("NoPatients")}
        </Box>
      )}

      {data && data.length > 0 && (
        <>
          <Box as="p" textAlign="center">
            {t("SelectAccessText")}
          </Box>

          <Table>
            <thead>
              <tr>
                <Th>{t("Name")}</Th>
                <Th>{t("AccessType")}</Th>
                <Th textAlign="center">
                  <VisuallyHidden>{t("SelectPatientAction")}</VisuallyHidden>
                </Th>
              </tr>
            </thead>
            <tbody>
              {data?.map((p) => (
                <tr key={p.id}>
                  <Td>
                    <Box as="span" fontWeight="bold">
                      {p.fullName}
                    </Box>
                  </Td>
                  <Td>
                    {p.allowCaregiverAccess ? (
                      t(`AccessType${p.typeOfAccess}`)
                    ) : (
                      <Box as="span" color="muted">
                        {t("NoAccess")}
                      </Box>
                    )}
                  </Td>
                  <Td textAlign="center">
                    {p.allowCaregiverAccess && (
                      <Button
                        className={cellAction}
                        data-automation-hook="select-patient-access-button"
                        onClick={() => handleSelectPatient(p.id)}
                        priority={2}
                        round
                        size="sm"
                      >
                        <AccessibleIcon
                          label={`Select patient access for ${p.fullName}`}
                          icon={<MdChevronRight size={18} />}
                        />
                      </Button>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {user?.isPatient && (
        <Box pt="3x" borderTop="global" textAlign="center">
          <Button
            data-automation-hook="select-self-access-button"
            onClick={() => handleSelectPatient(null)}
            priority={3}
          >
            {t("ContinueAsSelf")}
          </Button>
        </Box>
      )}
      {!user?.isPatient && (
        <Box pt="3x" borderTop="global" textAlign="center">
          <Button
            data-automation-hook="register-as-patient-button"
            onClick={() => {
              handleRegisterPatient(null);
            }}
            priority={3}
          >
            {t("RegisterAsPatient")}
          </Button>
        </Box>
      )}

      <Loading show={isLoading} />
      <Toast
        description={common("ErrorMessage")}
        kind="danger"
        open={isError}
        setOpen={resetMutation}
        title={common("Error")}
      />
    </>
  );
};

export { CaregiverPatients };
