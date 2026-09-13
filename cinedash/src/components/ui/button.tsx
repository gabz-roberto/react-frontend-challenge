import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  [
    "group/button",
    "inline-flex shrink-0 items-center justify-center",
    "border-2 border-foreground",
    "rounded-md",
    "font-bold",
    "uppercase tracking-[0.04em]",
    "whitespace-nowrap",
    "select-none",
    "outline-none",
    "transition-[transform,box-shadow,background-color,color]",
    "duration-150",
    "shadow-[4px_4px_0_var(--foreground)]",
    "hover:-translate-x-0.5 hover:-translate-y-0.5",
    "hover:shadow-[6px_6px_0_var(--foreground)]",
    "active:translate-x-[3px] active:translate-y-[3px]",
    "active:shadow-[1px_1px_0_var(--foreground)]",
    "focus-visible:ring-2 focus-visible:ring-ring",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:translate-x-0 disabled:translate-y-0",
    "disabled:opacity-50 disabled:shadow-none",
    "aria-invalid:border-destructive",
    "aria-invalid:ring-2 aria-invalid:ring-destructive/30",
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary",

        outline:
          "bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground",

        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary",

        ghost:
          "border-transparent bg-transparent text-foreground shadow-none hover:border-foreground hover:bg-muted hover:shadow-[3px_3px_0_var(--foreground)] active:shadow-none",

        destructive: "bg-destructive text-white hover:bg-destructive",

        link: "border-transparent bg-transparent p-0 text-foreground shadow-none underline decoration-2 underline-offset-4 hover:translate-x-0 hover:translate-y-0 hover:shadow-none hover:decoration-primary active:translate-x-0 active:translate-y-0",
      },

      size: {
        default: "h-10 gap-2 px-4 text-sm",

        xs: "h-7 gap-1.5 rounded-sm px-2.5 text-[0.7rem] [&_svg:not([class*='size-'])]:size-3",

        sm: "h-8 gap-1.5 px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",

        lg: "h-12 gap-2.5 px-6 text-base",

        icon: "size-10",

        "icon-xs": "size-7 rounded-sm [&_svg:not([class*='size-'])]:size-3",

        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",

        "icon-lg": "size-12 [&_svg:not([class*='size-'])]:size-5",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
