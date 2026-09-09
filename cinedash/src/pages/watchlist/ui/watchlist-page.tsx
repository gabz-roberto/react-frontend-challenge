import { AppShell } from "@/widgets/app-shell/app-shell";

export function WatchlistPage() {
  return (
    <AppShell>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Watchlist</h1>

        <p className="text-muted-foreground">
          Seus filmes salvos aparecerão aqui.
        </p>
      </div>
    </AppShell>
  );
}
