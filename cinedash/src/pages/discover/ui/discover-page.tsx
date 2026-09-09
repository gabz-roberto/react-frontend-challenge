import { AppShell } from "@/widgets/app-shell/app-shell";

export function DiscoverPage() {
  return (
    <AppShell>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Discover</h1>

        <p className="text-muted-foreground">
          Explore filmes populares e encontre o que assistir.
        </p>
      </div>
    </AppShell>
  );
}
