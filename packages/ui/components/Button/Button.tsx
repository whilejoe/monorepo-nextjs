import { forwardRef } from "react";
import { motion, useReducedMotion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { button, ButtonVariants } from "./Button.css";

export type ButtonProps = HTMLMotionProps<"button"> &
  ButtonVariants & { children: React.ReactNode; disableAnimations?: boolean };
export type ButtonRef = HTMLButtonElement;

const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    disableAnimations,
    disabled,
    full,
    kind,
    priority,
    round,
    size,
    ...rest
  } = props;

  const shouldReduceMotion = useReducedMotion();
  const shouldDisableInteractions =
    shouldReduceMotion || disabled || disableAnimations;

  return (
    <motion.button
      {...rest}
      ref={ref}
      className={clsx(button({ full, kind, priority, round, size }), className)}
      disabled={disabled}
      whileHover={shouldDisableInteractions ? undefined : { scale: 1.06 }}
      whileTap={shouldDisableInteractions ? undefined : { scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";

export { Button };
