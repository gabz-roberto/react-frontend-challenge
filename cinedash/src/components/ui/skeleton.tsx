import * as React from "react";

import { cn } from "cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        [
          "animate-pulse",
          "rounded-sm",
          "bg-muted",
          "border border-foreground/20",
        ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
