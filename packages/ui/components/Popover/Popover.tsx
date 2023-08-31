import { forwardRef } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { clsx } from "clsx";
import { content } from "./Popover.css";

/** Popover
 * @see {@link https://www.radix-ui.com/docs/primitives/components/popover#api-reference}
 * @example Basic
 * import { Popover, PopoverTrigger, PopoverContent } from 'ui/components/Popover';
 *
 * <Popover>
 *   <PopoverTrigger>Popover trigger</PopoverTrigger>
 *   <PopoverContent>Popover content</PopoverContent>
 * </Popover>
 *
 * @example Custom Trigger
 * <PopoverTrigger asChild>
 *   <Button>Click</Button>
 * </PopoverTrigger>
 */

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverClose = PopoverPrimitive.Close;

export const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithRef<typeof PopoverPrimitive.Content>
>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        {...rest}
        ref={ref}
        className={clsx(content, className)}
      />
    </PopoverPrimitive.Portal>
  );
});

PopoverContent.displayName = "PopoverContent";
