import { forwardRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AccessibleIcon } from "../AccessibleIcon";
import { MdExpandMore } from "react-icons/md";
import { Chevron, Content, Header, Root, Trigger } from "./Accordion.css";

/** Accordion
 * @see {@link https://www.radix-ui.com/docs/primitives/components/accordion#api-reference}
 * @example Basic
 * import {Accordion, AccordionItem, AccordionTrigger, AccordionContent,} from "ui/components/Accordion";
 *
 * <Accordion type="single">
 *   <AccordionItem value="1">
 *     <AccordionTrigger>Trigger</AccordionTrigger>
 *     <AccordionContent>Content</AccordionContent>
 *    </AccordionItem>
 *  </Accordion>
 */

export const Accordion = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithRef<typeof AccordionPrimitive.Root>
>((props, ref) => {
  return (
    <AccordionPrimitive.Root
      type="single"
      defaultValue="item-1"
      collapsible
      ref={ref}
      className={Root}
    >
      {props.children}
    </AccordionPrimitive.Root>
  );
});

Accordion.displayName = "Accordion";

export const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>
>((props, ref) => {
  return (
    <AccordionPrimitive.Item ref={ref} value={props.value}>
      {props.children}
    </AccordionPrimitive.Item>
  );
});

AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>
>((props, ref) => {
  return (
    <AccordionPrimitive.Header className={Header}>
      <AccordionPrimitive.Trigger className={Trigger} ref={ref}>
        {props.children}
        <div className={Chevron} style={{ marginLeft: "10px" }}>
          <AccessibleIcon label="Open" icon={<MdExpandMore size={24} />} />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>
>((props, ref) => {
  return (
    <AccordionPrimitive.Content className={Content} ref={ref}>
      {props.children}
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = "AccordionContent";
