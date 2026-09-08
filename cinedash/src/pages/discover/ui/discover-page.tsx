import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/model/auth.store";

export function DiscoverPage() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate({
      to: "/login",
    });
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Discover</h1>

      <Button className="mt-4" variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </main>
  );
}
