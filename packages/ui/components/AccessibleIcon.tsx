import { cloneElement, isValidElement } from "react";
import { VisuallyHidden } from "./VisuallyHidden";

type Props = {
  /**
   * The accessible label for the icon. This label will be visually hidden but announced to screen
   * reader users, similar to `alt` text for `img` tags.
   * Needed when icons are used for buttons/actions that don't contain meaningful text.
   * Not needed for icons that are presentational only.
   */
  label?: string;
  icon: React.ReactNode;
};

const AccessibleIcon = ({ label, icon }: Props) => {
  return (
    <>
      {isValidElement<any>(icon)
        ? cloneElement(icon, {
            // accessibility
            "aria-hidden": "true",
            focusable: "false", // See: https://allyjs.io/tutorials/focusing-in-svg.html#making-svg-elements-focusable
          })
        : null}
      <VisuallyHidden as="span">{label}</VisuallyHidden>
    </>
  );
};

export { AccessibleIcon };
