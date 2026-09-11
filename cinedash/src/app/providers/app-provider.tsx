import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

import { QueryProvider } from "./query-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors position="bottom-right" />
    </QueryProvider>
  );
}
