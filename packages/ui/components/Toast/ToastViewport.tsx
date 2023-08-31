import { Viewport, ToastViewportProps } from "@radix-ui/react-toast";
import { viewport } from "./ToastViewport.css";

const ToastViewport = (props: ToastViewportProps) => {
  return <Viewport {...props} className={viewport} />;
};

export { ToastViewport };
