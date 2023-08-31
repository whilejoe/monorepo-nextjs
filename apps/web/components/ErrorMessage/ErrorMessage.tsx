import { Box, BoxProps } from "ui/components/Box";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { MdOutlineErrorOutline } from "react-icons/md";

const ErrorMessage = ({ children, ...props }: BoxProps) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        display="flex"
        align="center"
        gap="3x"
        m="auto"
        color="danger"
        {...props}
      >
        <AccessibleIcon icon={<MdOutlineErrorOutline size={28} />} />
        <Box
          as="p"
          mb="0x"
          color="text"
          lineHeight="dense"
          fontSize="sm"
          style={{ maxWidth: "50ch" }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export { ErrorMessage };
