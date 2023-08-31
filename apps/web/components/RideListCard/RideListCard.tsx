import { clsx } from "clsx";
import { Box, BoxProps } from "ui/components/Box";
import { detailContainer } from "./RideListCard.css";

type RideListCardProps = BoxProps & {
  dense?: boolean;
};

const RideListCard = ({ className, dense, ...props }: RideListCardProps) => {
  return (
    <Box
      className={clsx(detailContainer, className)}
      display="flex"
      gap={dense ? "2.5x" : "3x"}
      {...props}
    />
  );
};

export { RideListCard };
