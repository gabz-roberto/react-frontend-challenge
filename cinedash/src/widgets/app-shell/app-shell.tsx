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
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link to="/discover" className="text-xl font-bold">
              CineDash
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                to="/discover"
                className="text-sm text-muted-foreground hover:text-foreground"
                activeProps={{
                  className: "text-sm font-medium text-foreground",
                }}
              >
                Explore
              </Link>

              <Link
                to="/watchlist"
                className="text-sm text-muted-foreground hover:text-foreground"
                activeProps={{
                  className: "text-sm font-medium text-foreground",
                }}
              >
                Favoritos
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
