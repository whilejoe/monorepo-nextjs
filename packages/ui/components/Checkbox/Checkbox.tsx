import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Box } from "../Box";
import { MdCheck } from "react-icons/md";
import { checkboxRoot } from "./Checkbox.css";
import { fieldLabel } from "../Forms";

interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  label: string;
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
  return (
    <Box display="flex" alignItems="center">
      <CheckboxPrimitive.Root {...props} className={checkboxRoot}>
        <CheckboxPrimitive.CheckboxIndicator>
          <MdCheck />
        </CheckboxPrimitive.CheckboxIndicator>
      </CheckboxPrimitive.Root>
      <label
        className={fieldLabel}
        style={{ paddingBottom: "0", marginLeft: "6px" }}
        htmlFor={props.id}
      >
        {label}
      </label>
    </Box>
  );
};

export { Checkbox };
