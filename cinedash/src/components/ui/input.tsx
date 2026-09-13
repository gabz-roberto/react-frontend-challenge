import * as React from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        [
          "h-11 w-full min-w-0",
          "rounded-md",
          "border-2 border-foreground",
          "bg-card",
          "px-3 py-2",
          "text-base text-foreground",
          "font-medium",
          "outline-none",
          "shadow-[3px_3px_0_var(--foreground)]",
          "transition-[transform,box-shadow,background-color]",
          "duration-150",

          "placeholder:text-muted-foreground",
          "placeholder:font-medium",

          "hover:bg-background",

          "focus-visible:-translate-x-0.5",
          "focus-visible:-translate-y-0.5",
          "focus-visible:bg-background",
          "focus-visible:shadow-[5px_5px_0_var(--foreground)]",
          "focus-visible:ring-0",

          "disabled:pointer-events-none",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "disabled:shadow-none",

          "aria-invalid:border-destructive",
          "aria-invalid:shadow-[3px_3px_0_var(--destructive)]",

          "file:inline-flex",
          "file:h-7",
          "file:border-0",
          "file:bg-transparent",
          "file:text-sm",
          "file:font-bold",
          "file:text-foreground",

          "md:text-sm",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Input };
