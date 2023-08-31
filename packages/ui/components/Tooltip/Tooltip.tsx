import { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { content } from "./Tooltip.css";

/** Tooltip
 * @see {@link https://www.radix-ui.com/docs/primitives/components/tooltip#api-reference}
 * @example Basic
 * import { Tooltip, TooltipTrigger, TooltipContent } from 'ui/components/Tooltip';
 *
 * <Tooltip>
 *   <TooltipTrigger>Tooltip trigger</TooltipTrigger>
 *   <TooltipContent>Tooltip content</TooltipContent>
 * </Tooltip>
 *
 * @example Custom Trigger
 * <TooltipTrigger asChild>
 *   <Button>Click</Button>
 * </TooltipTrigger>
 */

export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;
export const TooltipProvider = TooltipPrimitive.Provider;

export const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithRef<typeof TooltipPrimitive.Content>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        {...rest}
        ref={ref}
        className={clsx(content, className)}
      />
    </TooltipPrimitive.Portal>
  );
});

TooltipContent.displayName = "TooltipContent";
