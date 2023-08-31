import { Box, BoxProps } from "ui/components/Box";

type CardProps = BoxProps & {
  dense?: boolean;
};

const Card = ({ dense, ...props }: CardProps) => {
  return (
    <Box
      as="div"
      p={dense ? "3x" : "4x"}
      bg="background"
      borderRadius="sm"
      border="global"
      boxShadow="card"
      {...props}
    />
  );
};

export { Card };
