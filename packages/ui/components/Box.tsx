import { ComponentPropsWithRef } from "react";
import { createBox } from "@dessert-box/react";
import { atoms } from "../styles/atoms.css";

const Box = createBox({
  atoms,
});

export type BoxProps = ComponentPropsWithRef<typeof Box>;
export { Box };
