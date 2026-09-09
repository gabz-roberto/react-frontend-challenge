import { AppShell } from "@/widgets/app-shell/app-shell";

export function MovieDetailsPage() {
  return (
    <AppShell>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Movie Details</h1>

        <p className="text-muted-foreground">Detalhes do filme.</p>
      </div>
    </AppShell>
  );
}
