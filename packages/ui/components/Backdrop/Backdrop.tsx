import { forwardRef } from "react";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { backdrop } from "./Backdrop.css";

export type BackdropProps = {
  children?: React.ReactNode;
};

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  return (
    <DialogOverlay asChild>
      <motion.div
        ref={ref}
        initial="initial"
        animate="animate"
        exit="initial"
        variants={variants}
        className={backdrop}
      >
        {props.children}
      </motion.div>
    </DialogOverlay>
  );
});

Backdrop.displayName = "Backdrop";

export { Backdrop };
