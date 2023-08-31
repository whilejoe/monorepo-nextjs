import { useCallback, useState, ChangeEvent } from "react";
import { Box } from "ui/components/Box";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Combobox } from "@headlessui/react";
import {
  useController,
  FieldValues,
  FieldPathByValue,
  UseControllerProps,
} from "react-hook-form";
import {
  inputBase,
  InputGroup,
  InputLabel,
  InputContainer,
  InputError,
  filled,
} from "ui/components/Forms";
import { useGoogleMaps } from "components/GoogleMapsProvider";
import { usePlacesSuggestions } from "hooks/usePlacesSuggestions";
import {
  clearButton,
  dropdown,
  locationIcon,
  option,
} from "./LocationSearch.css";

import { MdLocationPin } from "react-icons/md";

import clsx from "clsx";
import { Button } from "ui/components/Button";
import { MdOutlineClose } from "react-icons/md";
import { useTranslation } from "react-i18next";

export type LocationSearchValue = string | null;

type InputProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  "autoFocus" | "disabled" | "onBlur" | "onFocus" | "placeholder"
>;

export interface LocationSearchProps<
  TFieldValues extends FieldValues,
  Path extends FieldPathByValue<TFieldValues, LocationSearchValue>
> extends InputProps,
    UseControllerProps<TFieldValues, Path> {
  /** Only show label to screen readers */
  className?: string;
  hideLabel?: boolean;
  /** Associates the input to its label for accessibility.
   * @default name
   */
  id?: string;
  postalCode?: string;
  label: string;
  initialValue?: string;
  showNamedLocations?: boolean;
  onSelect?: (suggestion: LocationSearchValue) => void;
}

const LocationSearch = <
  TFieldValues extends FieldValues,
  Path extends FieldPathByValue<TFieldValues, LocationSearchValue>
>(
  props: LocationSearchProps<TFieldValues, Path>
) => {
  const {
    autoFocus,
    className,
    disabled,
    hideLabel,
    id,
    label,
    name,
    onBlur,
    onFocus,
    onSelect,
  } = props;

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { field, fieldState } = useController(props);
  const { suggestions } = usePlacesSuggestions(value);
  const { isLoaded } = useGoogleMaps();
  const { t } = useTranslation("home");

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const handleOnSelect = useCallback(
    (val: LocationSearchValue) => {
      field.onChange(val);
      if (onSelect) onSelect(val);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.onChange, onSelect]
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<any>) => {
      setIsFocused(true);
      if (onFocus) onFocus(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<any>) => {
      setIsFocused(false);
      field.onBlur();
      if (onBlur) onBlur(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.onBlur, onBlur]
  );

  if (!isLoaded) return null;

  const hasError = !!fieldState.error;
  const inputId = id || name;
  const errorId = `${inputId}-error`;

  return (
    <InputGroup hasError={hasError} isDisabled={disabled} isFocused={isFocused}>
      <InputContainer>
        <Combobox
          disabled={disabled}
          nullable
          onChange={handleOnSelect}
          value={field.value}
        >
          <Combobox.Button as="div" style={{ width: "100%" }}>
            <Combobox.Input
              autoComplete="off"
              autoFocus={autoFocus}
              className={clsx(className, inputBase)}
              id={id}
              name={name}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={handleOnChange}
              ref={field.ref}
            />
          </Combobox.Button>
          {suggestions && suggestions.length > 0 && (
            <Combobox.Options className={dropdown}>
              {suggestions?.map((s) => (
                <Combobox.Option
                  key={s.place_id}
                  className={option}
                  value={s.description}
                >
                  <Box display="flex">
                    <Box as="div" className={locationIcon}>
                      <AccessibleIcon icon={<MdLocationPin size={17} />} />
                    </Box>
                    {s.description}
                  </Box>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}

          {field.value && (
            <Box className={clearButton}>
              <Button
                kind="muted"
                priority={3}
                round
                size="sm"
                type="button"
                onClick={() => {
                  field.onChange(null);
                }}
              >
                <AccessibleIcon
                  label={t("Reset")}
                  icon={<MdOutlineClose size={20} />}
                />
              </Button>
            </Box>
          )}
        </Combobox>
        <InputLabel
          disabled={disabled}
          hideVisually={hideLabel}
          inputId={inputId}
          className={field.value || value ? filled : ""}
        >
          {label}
        </InputLabel>
      </InputContainer>
      {hasError && (
        <InputError errorId={errorId}>{fieldState.error?.message}</InputError>
      )}
    </InputGroup>
  );
};

export { LocationSearch };
