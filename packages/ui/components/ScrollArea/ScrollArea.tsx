import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

interface ScrollAreaProps {
  child?: React.ReactNode;
  orientation?: "horizontal" | "vertical";
}

const ScrollArea = ({ child, orientation = "horizontal" }: ScrollAreaProps) => {
  return (
    <ScrollAreaPrimitive.ScrollArea>
      <ScrollAreaPrimitive.ScrollAreaViewport>
        {child}
      </ScrollAreaPrimitive.ScrollAreaViewport>
      <ScrollAreaPrimitive.ScrollAreaScrollbar orientation={orientation}>
        <ScrollAreaPrimitive.ScrollAreaThumb />
      </ScrollAreaPrimitive.ScrollAreaScrollbar>
      <ScrollAreaPrimitive.ScrollAreaCorner />
    </ScrollAreaPrimitive.ScrollArea>
  );
};

export { ScrollArea };
