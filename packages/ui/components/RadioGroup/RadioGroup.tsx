import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import {
  radioGroupIndicator,
  radioGroupItem,
  radioGroupRoot,
} from "./RadioGroup.css";
import { Box } from "../Box";
import { fieldLabel } from "../Forms";

/** RadioGroup
 * @see {@link https://www.radix-ui.com/docs/primitives/components/radio-group#api-reference}
 * @example Basic
 * import { RadioGroup, RadioGroupItem } from "ui/components/RadioGroup"
 *
 * <RadioGroup
 *  value={amPm}
 *  defaultValue={amPm}
 *  onValueChange={(v) => onSelectAmPm(v)}
 *  >
 *    <RadioGroupItem label="AM" value="AM" />
 *    <RadioGroupItem label="PM" value="PM" />
 * </RadioGroup>
 */

interface RadioGroupItemProps extends RadioGroupPrimitive.RadioGroupItemProps {
  label: string;
}

export const RadioGroupItem = ({ label, ...props }: RadioGroupItemProps) => {
  return (
    <Box display="flex" gap="2x" alignItems="center">
      <RadioGroupPrimitive.Item className={radioGroupItem} {...props}>
        <RadioGroupPrimitive.RadioGroupIndicator
          className={radioGroupIndicator}
        ></RadioGroupPrimitive.RadioGroupIndicator>
      </RadioGroupPrimitive.Item>
      <label
        style={{ paddingLeft: "3px", paddingBottom: "0px" }}
        className={fieldLabel}
        htmlFor={props.id}
      >
        {label}
      </label>
    </Box>
  );
};

export const RadioGroup = ({
  children,
  ...props
}: RadioGroupPrimitive.RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root className={radioGroupRoot} {...props}>
      {children}
    </RadioGroupPrimitive.Root>
  );
};

RadioGroup.displayName = "RadioGroup";
