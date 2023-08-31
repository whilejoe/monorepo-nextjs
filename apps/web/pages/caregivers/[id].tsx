import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { Box } from "ui/components/Box";
import { Loading } from "ui/components/Loading";
import { Select, SelectOption, fieldLabel } from "ui/components/Forms";
import { Button } from "ui/components/Button";
import { Modal } from "ui/components/Modal";
import { Toast } from "ui/components/Toast";
import { useGlobalToast } from "ui/components/Toast";
import { Card } from "components/Card";
import { Toggle } from "components/Toggle";
import { PageTitle } from "components/PageTitle";
import { AuthedRestrictedLayout } from "components/AuthedRestrictedLayout";
import { useCaregiver } from "hooks/useCaregiver";
import { CaregiverUpdate, useUpdateCaregiver } from "hooks/useUpdateCaregiver";
import { useDeleteCaregiver } from "hooks/useDeleteCaregiver";
import { useUser } from "hooks/useUser";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import Link from "next/link";
import { settingsBack } from "components/SettingsNavigation/SettingsNavigation.css";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { MdChevronLeft } from "react-icons/md";

type CaregiverForm = Pick<CaregiverUpdate, "typeOfAccess">;

const CaregiverById: NextPageWithLayout = () => {
  const [showDeleteCaregiver, setShowDeleteCaregiver] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const { query, replace } = useRouter();
  const { data } = useCaregiver(query?.id as string);
  const { data: user } = useUser();
  const { mutate, isLoading } = useUpdateCaregiver();
  const { mutate: deleteMutate, isLoading: isLoadingDelete } =
    useDeleteCaregiver();
  const toast = useGlobalToast();
  const { t } = useTranslation("caregivers");
  const { t: common } = useTranslation("common");

  const { control, watch } = useForm<CaregiverForm>({
    defaultValues: {
      typeOfAccess: data?.typeOfAccess,
    },
  });

  useEffect(() => {
    if (data) {
      const subscription = watch((value) => {
        mutate(
          { ...data, ...value },
          {
            onSuccess: () => setUpdateSuccess(true),
            onError: () => setUpdateError(true),
          }
        );
      });

      return () => subscription.unsubscribe();
    }
  }, [mutate, watch, data]);

  if (!data) return <p>{t("CaregiverNotFound")}</p>;

  return (
    <Card mx="auto" style={{ maxWidth: 460 }}>
      <PageTitle title={`Caregiver - ${data.fullName}`} />
      <Box mb="4x">
        <Link href="/caregivers" className={settingsBack}>
          <AccessibleIcon icon={<MdChevronLeft size={20} />} />
          {t("Back to Caregivers")}
        </Link>
      </Box>
      <Box mb="6x" textAlign="center">
        <Box as="h1" mb="0x">
          {data.fullName}
        </Box>
        {data.email && (
          <Box as="span" fontSize="sm" color="muted">
            {data.email}
          </Box>
        )}
      </Box>

      <form>
        <Box pb="3x" mb="3x" borderBottom="global">
          <Toggle
            style={{ justifyContent: "space-between" }}
            data-automation-hook="caregiver-details-toggle-access-button"
            defaultChecked={data.allowCaregiverAccess}
            disabled={!user?.caregiverFullAccess}
            id="caregiver-details-toggle-access"
            label={t("AllowAccess")}
            onCheckedChange={(checked) =>
              mutate(
                {
                  allowCaregiverAccess: checked,
                  typeOfAccess: data.typeOfAccess,
                  caregiverId: data.caregiverId,
                },
                {
                  onSuccess: () => setUpdateSuccess(true),
                  onError: () => setUpdateError(true),
                }
              )
            }
            type="button"
          />
        </Box>

        <Box
          display="flex"
          flexDirection="row"
          gap="2x"
          align="center"
          justify="space-between"
        >
          <Box
            aria-hidden="true"
            as="span"
            mb="4x"
            className={fieldLabel}
            color={!user?.caregiverFullAccess ? "muted" : undefined}
            style={{ paddingLeft: 0 }}
          >
            {t("LevelOfAccess")}:
          </Box>
          <Box flex="1" style={{ maxWidth: 160 }}>
            <Select
              control={control}
              disabled={!user?.caregiverFullAccess}
              hideLabel
              inputId="typeOfAccess"
              name="typeOfAccess"
              label={t("LevelOfAccess")}
            >
              <SelectOption value="ViewOnly">
                {t("AccessTypeViewOnly")}
              </SelectOption>
              <SelectOption value="FullAccess">
                {t("AccessTypeFullAccess")}
              </SelectOption>
            </Select>
          </Box>
        </Box>
      </form>

      {user?.caregiverFullAccess && (
        <Box textAlign="center" mt="3x">
          <Modal
            maxWidth={400}
            onOpenChange={setShowDeleteCaregiver}
            open={showDeleteCaregiver}
            title={t("RemoveCaregiver")}
            trigger={
              <Button
                data-automation-hook="open-delete-caregiver-confirmation-button"
                kind="danger"
                priority={2}
              >
                {t("RemoveCaregiver")}
              </Button>
            }
          >
            <p>
              <Trans
                i18nKey="caregivers:RemoveCaregiverConfirmationText"
                values={{ Name: data.fullName }}
                components={{
                  b: <Box as="span" fontWeight="bold" whiteSpace="nowrap" />,
                }}
              />
            </p>
            <Box mt="5x">
              <Button
                data-automation-hook="confirm-delete-caregiver-button"
                onClick={() => {
                  deleteMutate(
                    { caregiverId: data.caregiverId },
                    {
                      onSuccess: () => {
                        replace("/caregivers"),
                          toast.add("removeCaregiverSuccess", {
                            description: t("RemoveCaregiverSuccess"),
                            kind: "success",
                          });
                      },
                      onError: () => {
                        toast.add("removeCaregiverError", {
                          description: t("RemoveCaregiverError"),
                          kind: "danger",
                        });
                      },
                    }
                  );
                }}
                full
              >
                {common("Confirm")}
              </Button>
            </Box>
            <Loading show={isLoadingDelete} />
          </Modal>
        </Box>
      )}

      <Loading show={isLoading} />

      <Toast
        description={t("UpdateSuccess")}
        kind="success"
        open={updateSuccess}
        setOpen={setUpdateSuccess}
        title={common("Success")}
      />
      <Toast
        description={t("UpdateError")}
        kind="danger"
        open={updateError}
        setOpen={setUpdateError}
        title={common("Error")}
      />
    </Card>
  );
};

CaregiverById.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthedRestrictedLayout>{page}</AuthedRestrictedLayout>;
};

export default CaregiverById;
