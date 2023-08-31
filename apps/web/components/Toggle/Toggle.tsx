import { Switch, SwitchThumb, SwitchProps } from "@radix-ui/react-switch";
import { Box } from "ui/components/Box";
import { srOnly } from "ui/styles/utils.css";
import { toggleLabel, toggle, toggleBackground } from "./Toggle.css";

interface ToggleProps extends SwitchProps {
  id: string;
  hideLabel?: boolean;
  label: string;
}

// TODO: Move to ui/components/Forms
const Toggle = ({
  className,
  disabled,
  id,
  hideLabel,
  label,
  style,
  ...rest
}: ToggleProps) => {
  return (
    <Box className={className} display="flex" alignItems="center" style={style}>
      <label
        className={hideLabel ? srOnly : toggleLabel}
        data-disabled={disabled}
        htmlFor={id}
      >
        {label}
      </label>
      <Switch
        {...rest}
        className={toggleBackground}
        disabled={disabled}
        id={id}
      >
        <SwitchThumb className={toggle}></SwitchThumb>
      </Switch>
    </Box>
  );
};

export { Toggle };
