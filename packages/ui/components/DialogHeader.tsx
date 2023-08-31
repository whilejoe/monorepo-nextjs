import { DialogTitle } from "@radix-ui/react-dialog";
import { clsx } from "clsx";
import { DialogClose } from "./DialogClose";
import { Box } from "./Box";
import { srOnly } from "../styles/utils.css";
import { Atoms } from "../styles/atoms.css";

export type DialogHeaderProps = {
  hideCloseButton?: boolean;
  hideTitle?: boolean;
  justify?: Atoms["justifyContent"];
  title?: string;
};

const DialogHeader = ({
  hideCloseButton,
  hideTitle,
  justify,
  title,
}: DialogHeaderProps) => {
  return (
    <Box
      display="flex"
      justifyContent={justify}
      alignItems="center"
      gap="3x"
      mb={title && !hideTitle ? "4x" : undefined}
    >
      {title && (
        <DialogTitle asChild>
          <Box
            as="h1"
            className={clsx({ [srOnly]: hideTitle })}
            mb="0x"
            fontSize="xxl"
          >
            {title}
          </Box>
        </DialogTitle>
      )}
      {!hideCloseButton && <DialogClose />}
    </Box>
  );
};

export { DialogHeader };
