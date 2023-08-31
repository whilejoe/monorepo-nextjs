import { clsx } from "clsx";
import { Box, BoxProps } from "ui/components/Box";
import { container, table } from "./Table.css";

const Table = ({ children, className, ...props }: BoxProps) => {
  return (
    <div className={clsx(className, container)}>
      <Box as="table" className={table} {...props}>
        {children}
      </Box>
    </div>
  );
};

const Th = (props: BoxProps) => {
  return (
    <Box
      as="th"
      px="2.5x"
      py="3x"
      color="muted"
      fontSize="sm"
      fontWeight="heading"
      lineHeight="heading"
      textAlign="left"
      borderBottom="globalInteractive"
      whiteSpace="nowrap"
      {...props}
    />
  );
};

const Td = (props: BoxProps) => {
  return (
    <Box
      as="td"
      px="2.5x"
      py="3x"
      fontSize="sm"
      lineHeight="dense"
      textAlign="left"
      borderTop="global"
      whiteSpace="nowrap"
      {...props}
    />
  );
};

export { Table, Td, Th };
