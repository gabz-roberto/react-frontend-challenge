import type { PropsWithChildren } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/model/auth.store";

import { ThemeToggle } from "@/features/theme/ui/theme-toggle";

export function AppShell({ children }: PropsWithChildren) {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate({
      to: "/login",
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b-2 border-foreground bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              to="/discover"
              className="neo-shadow inline-flex w-fit items-center border-2 border-foreground bg-primary px-4 py-2 text-lg font-black uppercase tracking-[-0.04em] text-primary-foreground transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              CineDash
            </Link>

            <nav className="flex w-fit overflow-hidden border-2 border-foreground bg-background">
              <Link
                to="/discover"
                className="border-r-2 border-foreground px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground sm:text-sm"
                activeProps={{
                  className:
                    "border-r-2 border-foreground bg-secondary px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-secondary-foreground sm:text-sm",
                }}
              >
                Explore
              </Link>

              <Link
                to="/watchlist"
                className="px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:text-sm"
                activeProps={{
                  className:
                    "bg-accent px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-accent-foreground sm:text-sm",
                }}
              >
                Favoritos
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {children}
      </main>
    </div>
  );
}
