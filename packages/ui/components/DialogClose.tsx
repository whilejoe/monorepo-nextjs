import { forwardRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { Close } from "@radix-ui/react-dialog";
import { AccessibleIcon } from "./AccessibleIcon";
import { Button } from "./Button";
import { atoms } from "../styles/atoms.css";

export type DialogCloseProps = React.ComponentPropsWithRef<typeof Close> & {
  size?: string | number;
};

const DialogClose = forwardRef<
  React.ElementRef<typeof Close>,
  DialogCloseProps
>(({ size = 24 }, ref) => {
  return (
    <Close asChild ref={ref}>
      <Button
        className={atoms({ flex: "none", ml: "auto" })}
        data-automation-hook="dialog-close-button"
        kind="text"
        priority={3}
        round
      >
        <AccessibleIcon
          label="Close dialog"
          icon={<MdOutlineClose size={size} />}
        />
      </Button>
    </Close>
  );
});

DialogClose.displayName = "DialogClose";

export { DialogClose };
