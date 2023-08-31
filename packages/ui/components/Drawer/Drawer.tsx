import {
  Close,
  Content,
  Portal,
  Root,
  Trigger,
  DialogProps,
} from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { Backdrop } from "../Backdrop";
import { DialogHeader, DialogHeaderProps } from "../DialogHeader";
import { drawerContent } from "./Drawer.css";

export type Alignment = "left" | "right" | "bottom";
type RootProps = Omit<DialogProps, "children" | "modal">;

const ALIGN = {
  right: { x: "110%" },
  left: { x: "-100%" },
  bottom: { y: "110%" },
};

const ANIMATE = {
  right: { x: "0%" },
  left: { x: "0%" },
  bottom: { y: "0%" },
};

export type DrawerProps = DialogHeaderProps &
  RootProps & {
    align?: Alignment;
    children?: React.ReactNode;
    className?: string;
    hideBackdrop?: boolean;
    preventOutsideClose?: boolean;
    style?: React.CSSProperties;
    trigger: React.ReactNode;
  };

const VARIANTS = {
  initial: (align: Alignment) => ALIGN[align],
  animate: (align: Alignment) => ANIMATE[align],
};

const Drawer = ({
  align = "left",
  children,
  className,
  defaultOpen,
  hideBackdrop,
  hideCloseButton,
  hideTitle,
  preventOutsideClose,
  title,
  trigger,
  onOpenChange,
  open,
}: DrawerProps) => {
  return (
    <Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      <Trigger asChild>{trigger}</Trigger>
      <AnimatePresence>
        {open ? (
          <Portal forceMount>
            {!hideBackdrop && <Backdrop key="backdrop" />}
            <Content
              asChild
              onEscapeKeyDown={
                preventOutsideClose ? (e) => e.preventDefault() : undefined
              }
              onInteractOutside={
                preventOutsideClose ? (e) => e.preventDefault() : undefined
              }
            >
              <motion.div
                key="content"
                animate="animate"
                className={clsx(drawerContent({ align }), className)}
                custom={align}
                exit="initial"
                initial="initial"
                style={{
                  right: align === "right" ? "0" : undefined,
                  left: align === "left" ? "0" : undefined,
                  bottom: align === "bottom" ? "0" : undefined,
                }}
                transition={{
                  type: "spring",
                  mass: 0.3,
                  stiffness: 180,
                  damping: 13,
                }}
                variants={VARIANTS}
              >
                <DialogHeader
                  hideCloseButton={hideCloseButton}
                  hideTitle={hideTitle}
                  title={title}
                />
                {children}
              </motion.div>
            </Content>
          </Portal>
        ) : null}
      </AnimatePresence>
    </Root>
  );
};

export { Drawer, Close };
