import { Box, BoxProps } from "./Box";
import { srOnly } from "../styles/utils.css";

type Props = {
  as?: BoxProps["as"];
  children?: React.ReactNode;
};

const VisuallyHidden = ({ as = "span", children }: Props) => {
  return (
    <Box as={as} className={srOnly}>
      {children}
    </Box>
  );
};

export { VisuallyHidden };
