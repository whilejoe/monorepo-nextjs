import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Trans, useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Box } from "ui/components/Box";
import { Button } from "ui/components/Button";
import { Map, Marker } from "components/Map";
import { Text } from "ui/components/Forms";
import { Modal } from "ui/components/Modal";
import { useGlobalToast } from "ui/components/Toast";
import { Loading } from "ui/components/Loading";
import { LocationSearch, LocationSearchValue } from "components/LocationSearch";
import { Location } from "models/Location";
import { NamedLocation } from "models/NamedLocation";
import { useNewNamedLocation } from "hooks/useNewNamedLocation";
import { useDeleteNamedLocation } from "hooks/useDeletedNamedLocation";
import { useNamedLocations } from "hooks/useNamedLocations";
import { useUpdateNamedLocation } from "hooks/useUpdateNamedLocation";
import { useMediaQuery } from "ui/hooks/useMediaQuery";
import { getLocation, formatAddressFromLocation } from "utils/getLocation";
import { useUser } from "hooks/useUser";

export interface NamedLocationForm {
  location: LocationSearchValue;
  name: string;
}

const isLocationValid = (location?: Location | null) => {
  return !location?.address.includes("undefined");
};

const SavedLocation = () => {
  const [selectedLocation, setSelectedLocation] = useState<
    NamedLocation | undefined
  >(undefined);
  const [formLocation, setFormLocation] = useState<Location | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { replace, query } = useRouter();
  const { data: namedLocations } = useNamedLocations();
  const locationId = query.id;
  const { mutate: deleteNameLocationMutation } = useDeleteNamedLocation();

  const newNamedLocationMutation = useNewNamedLocation();
  const updateNamedLocationMutation = useUpdateNamedLocation();
  const isDesktop = useMediaQuery("md");
  const { t } = useTranslation("settings");
  const toast = useGlobalToast();
  const { data: user } = useUser();

  const { control, handleSubmit, reset, setValue } = useForm<NamedLocationForm>(
    {
      defaultValues: {
        location: null,
        name: "",
      },
    }
  );

  // Gets the selected location from list of saved locations by id param,
  // Sync it up with the form data
  useEffect(() => {
    setSelectedLocation(namedLocations?.find((e) => e.id === locationId));
    if (selectedLocation) setFormLocation(selectedLocation);
  }, [locationId, namedLocations, selectedLocation]);

  useEffect(() => {
    reset();
    if (selectedLocation) {
      setValue("location", formatAddressFromLocation(selectedLocation!));
      setValue("name", selectedLocation.name);
    }
  }, [selectedLocation, setValue, reset]);

  const handleOnSelectStart = useCallback(
    async (val: LocationSearchValue) => {
      if (val) {
        const location = await getLocation({ address: val });
        setFormLocation(location);
      } else {
        setFormLocation(null);
      }
    },
    [setFormLocation]
  );

  const onNewSubmit = useCallback(
    (formData: NamedLocationForm) => {
      if (!formLocation) return;
      newNamedLocationMutation.mutate(
        {
          address: formLocation?.address,
          address2: formLocation?.address2,
          city: formLocation?.city,
          state: formLocation?.state,
          postalCode: formLocation?.postalCode,
          longitude: formLocation?.longitude,
          latitude: formLocation?.latitude,
          name: formData.name,
        },
        {
          onSuccess: (data) => {
            toast.add("saveLocationSuccess", {
              description: t("SaveLocationSuccess"),
              kind: "success",
            });
            replace(`/settings/saved-locations/${data.id}`);
          },
          onError: () => {
            toast.add("saveLocationFailure", {
              description: t("SaveLocationFailure"),
              kind: "danger",
            });
          },
        }
      );
    },
    [newNamedLocationMutation, formLocation, replace, t, toast]
  );

  const onEditSubmit = useCallback(
    (formData: NamedLocationForm) => {
      if (!formLocation) return;
      updateNamedLocationMutation.mutate(
        {
          address: formLocation?.address,
          address2: formLocation?.address2,
          city: formLocation?.city,
          state: formLocation?.state,
          postalCode: formLocation?.postalCode,
          longitude: formLocation?.longitude,
          latitude: formLocation?.latitude,
          name: formData.name,
          id: selectedLocation?.id,
        },
        {
          onSuccess: () => {
            toast.add("updateLocationSuccess", {
              description: t("UpdateLocationSuccess"),
              kind: "success",
            });
          },
          onError: () => {
            toast.add("updateLocationFailure", {
              description: t("UpdateLocationFailure"),
              kind: "danger",
            });
          },
        }
      );
    },
    [updateNamedLocationMutation, selectedLocation, formLocation, t, toast]
  );

  const onDelete = useCallback(() => {
    if (!selectedLocation?.id) return;
    deleteNameLocationMutation(selectedLocation.id, {
      onSuccess: () => {
        toast.add("deleteLocationSuccess", {
          description: t("DeleteLocationSuccess"),
          kind: "success",
        });
        replace(`/settings/saved-locations`);
      },
      onError: () => {
        toast.add("deleteLocationFailure", {
          description: t("DeleteLocationFailure"),
          kind: "danger",
        });
      },
    });
  }, [deleteNameLocationMutation, replace, selectedLocation, t, toast]);

  return (
    <>
      <Box
        display="flex"
        style={{ flexDirection: isDesktop ? "column" : "column-reverse" }}
      >
        <div>
          <Box
            borderRadius="sm"
            p="2x"
            fontWeight="bold"
            my="3x"
            backgroundColor="blue3"
          >
            {t("Location Information")}
          </Box>
          <form
            onSubmit={handleSubmit(
              selectedLocation ? onEditSubmit : onNewSubmit
            )}
          >
            <Text
              autoFocus
              control={control}
              enterKeyHint="next"
              label={t("Name")}
              name="name"
              rules={{ required: t("Location name is required") }}
            />
            <LocationSearch
              control={control}
              id="location"
              label={t("Location")}
              name="location"
              onSelect={handleOnSelectStart}
              rules={{
                required: t("Location is required"),
                validate: {
                  value: () =>
                    isLocationValid(formLocation) || t("Location is not valid"),
                },
              }}
              postalCode={user?.postalCode}
            />
            <Box mb="3x">
              <Button full type="submit">
                {!selectedLocation ? t("Submit") : t("Update")}
              </Button>
            </Box>
          </form>
          {selectedLocation && (
            <Box mb="3x">
              <Button
                priority={2}
                full
                onClick={() => setShowDeleteModal(true)}
              >
                {t("Remove Location")}
              </Button>
            </Box>
          )}
        </div>

        <Box
          borderRadius="sm"
          overflow="hidden"
          border="globalInteractive"
          style={{ height: isDesktop ? "300px" : "200px", width: "100%" }}
        >
          <Suspense fallback={<Loading show />}>
            <Map
              id="saved-location-map"
              offsetY={isDesktop ? undefined : -20}
              centerLatitude={
                formLocation?.latitude
                  ? formLocation.latitude
                  : selectedLocation?.latitude
              }
              centerLongitude={
                formLocation?.longitude
                  ? formLocation.longitude
                  : selectedLocation?.longitude
              }
            >
              {(formLocation || selectedLocation) && (
                <Marker
                  kind="current"
                  labelText={
                    formLocation
                      ? formatAddressFromLocation(formLocation)
                      : formatAddressFromLocation(selectedLocation!)
                  }
                  position={{
                    lat: formLocation?.latitude
                      ? formLocation.latitude
                      : selectedLocation!.latitude,
                    lng: formLocation?.longitude
                      ? formLocation.longitude
                      : selectedLocation!.longitude,
                  }}
                  zIndex={1}
                />
              )}
            </Map>
          </Suspense>
        </Box>
      </Box>

      <Modal
        onOpenChange={setShowDeleteModal}
        open={showDeleteModal}
        title={t("Remove Location")}
        maxWidth={420}
      >
        <Trans
          i18nKey="settings:RemoveLocationConfirmation"
          values={{ location: selectedLocation?.name }}
        />
        <Box mt="5x">
          <Button
            full
            onClick={() => {
              onDelete();
              setShowDeleteModal(false);
            }}
          >
            {t("Confirm")}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export { SavedLocation };
