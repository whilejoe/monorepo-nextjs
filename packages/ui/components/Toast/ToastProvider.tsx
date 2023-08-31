import { createContext, useContext, useMemo } from "react";
import { ToastProvider as RadixToastProvider } from "@radix-ui/react-toast";
import { Actions, useMap } from "../../hooks/useMap";
import { ToastViewport } from "./ToastViewport";
import { Toast, ToastProps } from "./Toast";

type Id = string;

type ToastState = Pick<
  ToastProps,
  "kind" | "description" | "duration" | "title"
>;

type ToastContextActions = Pick<Actions<Id, ToastState>, "add" | "delete">;

const ToastContext = createContext<ToastContextActions>({
  add: () => {},
  delete: () => {},
});

ToastContext.displayName = "ToastContext";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toastsMap, actions] = useMap<Id, ToastState>([]);
  const toasts = useMemo(() => Array.from(toastsMap.entries()), [toastsMap]);

  return (
    <RadixToastProvider swipeDirection="right" label="Notification">
      <ToastContext.Provider value={actions}>{children}</ToastContext.Provider>
      {toasts.map(([k, v]) => (
        <Toast
          key={k}
          {...v}
          open
          setOpen={(isOpen) => !isOpen && actions.delete(k)}
        />
      ))}
      <ToastViewport />
    </RadixToastProvider>
  );
};

const useGlobalToast = () => {
  const actions = useContext(ToastContext);

  if (typeof actions === "undefined") {
    throw new Error("useGlobalToast must be used within a ToastProvider");
  }

  return actions;
};

export { ToastProvider, useGlobalToast };
