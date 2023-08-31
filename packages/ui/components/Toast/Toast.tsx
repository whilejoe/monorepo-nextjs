import {
  Description,
  Root,
  ToastProps as RadixToastProps,
  Title,
} from "@radix-ui/react-toast";
import {
  toastDescription,
  toastStyle,
  toastTitle,
  ToastVariants,
} from "./Toast.css";

export type ToastProps = {
  description?: React.ReactNode;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: React.ReactNode;
} & Pick<RadixToastProps, "type" | "duration" | "defaultOpen" | "open"> &
  ToastVariants;

const Toast = ({ description, kind, title, setOpen, ...props }: ToastProps) => {
  return (
    <Root {...props} className={toastStyle({ kind })} onOpenChange={setOpen}>
      <Title className={toastTitle}>{title}</Title>
      <Description className={toastDescription}>{description}</Description>
    </Root>
  );
};

export { Toast };
