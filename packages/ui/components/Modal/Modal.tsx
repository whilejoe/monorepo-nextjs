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
import { content } from "./Modal.css";

type RootProps = Omit<DialogProps, "children" | "modal">;
type HeaderProps = Omit<DialogHeaderProps, "justify">;

export type ModalProps = HeaderProps &
  RootProps & {
    children?: React.ReactNode;
    className?: string;
    justifyTitle?: DialogHeaderProps["justify"];
    maxWidth?: React.CSSProperties["maxWidth"];
    onCloseComplete?: () => void;
    preventOutsideClose?: boolean;
    trigger?: React.ReactNode;
  };

const VARIANTS = {
  initial: { y: 50 },
  animate: { y: 0 },
  exit: { y: 0 },
};

const Modal = ({
  children,
  className,
  defaultOpen,
  hideCloseButton,
  hideTitle,
  preventOutsideClose,
  justifyTitle,
  maxWidth,
  title,
  trigger,
  onCloseComplete,
  onOpenChange,
  open,
}: ModalProps) => {
  return (
    <Root defaultOpen={defaultOpen} onOpenChange={onOpenChange} open={open}>
      {trigger && <Trigger asChild>{trigger}</Trigger>}
      <AnimatePresence onExitComplete={onCloseComplete}>
        {open ? (
          <Portal forceMount>
            <Backdrop key="backdrop">
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
                  className={clsx(content, className)}
                  initial="initial"
                  style={{ maxWidth }}
                  variants={VARIANTS}
                >
                  <DialogHeader
                    hideCloseButton={hideCloseButton}
                    hideTitle={hideTitle}
                    justify={justifyTitle}
                    title={title}
                  />
                  {children}
                </motion.div>
              </Content>
            </Backdrop>
          </Portal>
        ) : null}
      </AnimatePresence>
    </Root>
  );
};

export { Modal, Close };
