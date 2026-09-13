import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "@/features/theme/ui/theme-provider";

import { QueryProvider } from "./query-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}

        <Toaster richColors position="bottom-right" />
      </QueryProvider>
    </ThemeProvider>
  );
}
