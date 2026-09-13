import * as React from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "cn";

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1.5", className)}
      {...props}
    />
  );
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "flex flex-1 items-center text-left font-medium",
        className,
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default";
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        [
          "flex w-fit items-center justify-between",
          "gap-2",
          "whitespace-nowrap",
          "select-none",
          "outline-none",

          "rounded-md",
          "border-2 border-foreground",
          "bg-card",

          "px-3",
          "text-sm font-bold",
          "text-foreground",

          "shadow-[3px_3px_0_var(--foreground)]",

          "transition-[transform,box-shadow,background-color]",
          "duration-150",

          "hover:-translate-x-0.5",
          "hover:-translate-y-0.5",
          "hover:bg-background",
          "hover:shadow-[5px_5px_0_var(--foreground)]",

          "focus-visible:-translate-x-0.5",
          "focus-visible:-translate-y-0.5",
          "focus-visible:shadow-[5px_5px_0_var(--foreground)]",
          "focus-visible:ring-0",

          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:translate-x-0",
          "disabled:translate-y-0",
          "disabled:opacity-50",
          "disabled:shadow-none",

          "aria-invalid:border-destructive",
          "aria-invalid:shadow-[3px_3px_0_var(--destructive)]",

          "data-placeholder:text-muted-foreground",

          "data-[size=default]:h-11",
          "data-[size=sm]:h-9",

          "*:data-[slot=select-value]:line-clamp-1",
          "*:data-[slot=select-value]:flex",
          "*:data-[slot=select-value]:items-center",
          "*:data-[slot=select-value]:gap-1.5",

          "[&_svg]:pointer-events-none",
          "[&_svg]:shrink-0",
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
        className,
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon
        render={
          <span className="flex size-6 items-center justify-center border-l-2 border-foreground pl-2">
            <ChevronDownIcon className="size-4 text-foreground" />
          </span>
        }
      />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 8,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            [
              "relative isolate z-50",

              "max-h-(--available-height)",
              "w-(--anchor-width)",
              "min-w-40",

              "overflow-x-hidden",
              "overflow-y-auto",

              "rounded-md",
              "border-2 border-foreground",
              "bg-popover",
              "text-popover-foreground",

              "shadow-[5px_5px_0_var(--foreground)]",

              "origin-(--transform-origin)",

              "duration-100",

              "data-[align-trigger=true]:animate-none",

              "data-[side=bottom]:slide-in-from-top-1",
              "data-[side=top]:slide-in-from-bottom-1",
              "data-[side=left]:slide-in-from-right-1",
              "data-[side=right]:slide-in-from-left-1",

              "data-open:animate-in",
              "data-open:fade-in-0",
              "data-open:zoom-in-95",

              "data-closed:animate-out",
              "data-closed:fade-out-0",
              "data-closed:zoom-out-95",
            ].join(" "),
            className,
          )}
          {...props}
        >
          <SelectScrollUpButton />

          <SelectPrimitive.List className="p-1">
            {children}
          </SelectPrimitive.List>

          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn(
        [
          "px-2 py-1.5",
          "text-[0.7rem]",
          "font-black",
          "uppercase",
          "tracking-[0.08em]",
          "text-muted-foreground",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        [
          "relative",
          "flex w-full",
          "cursor-default",
          "items-center",
          "gap-2",

          "rounded-sm",

          "px-2",
          "py-2",
          "pr-9",

          "text-sm",
          "font-semibold",

          "outline-none",
          "select-none",

          "transition-colors",

          "focus:bg-secondary",
          "focus:text-secondary-foreground",

          "data-highlighted:bg-secondary",
          "data-highlighted:text-secondary-foreground",

          "data-disabled:pointer-events-none",
          "data-disabled:opacity-50",

          "[&_svg]:pointer-events-none",
          "[&_svg]:shrink-0",
          "[&_svg:not([class*='size-'])]:size-4",

          "*:[span]:last:flex",
          "*:[span]:last:items-center",
          "*:[span]:last:gap-2",
        ].join(" "),
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-5 items-center justify-center border-2 border-foreground bg-primary text-primary-foreground" />
        }
      >
        <CheckIcon className="size-3.5 stroke-[3]" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none my-1 h-0 border-t-2 border-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        [
          "sticky top-0 z-10",
          "flex w-full",
          "cursor-default",
          "items-center",
          "justify-center",

          "border-b-2 border-foreground",
          "bg-popover",

          "py-1",

          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
        className,
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        [
          "sticky bottom-0 z-10",
          "flex w-full",
          "cursor-default",
          "items-center",
          "justify-center",

          "border-t-2 border-foreground",
          "bg-popover",

          "py-1",

          "[&_svg:not([class*='size-'])]:size-4",
        ].join(" "),
        className,
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownArrow>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
