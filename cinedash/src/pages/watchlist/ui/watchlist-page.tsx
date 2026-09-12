import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";

import { useWatchlistStore } from "@/features/watchlist/model/watchlist.store";

import { WatchlistTable } from "@/features/watchlist/ui/watchlist-table";

import { AppShell } from "@/widgets/app-shell/app-shell";

export function WatchlistPage() {
  const movies = useWatchlistStore((state) => state.movies);

  const removeMovie = useWatchlistStore((state) => state.removeMovie);

  function handleRemove(movieId: number) {
    const movie = movies.find((item) => item.id === movieId);

    removeMovie(movieId);

    toast.warning("Filme removido da Lista", {
      description: movie?.title,
    });
  }

  if (movies.length === 0) {
    return (
      <AppShell>
        <section className="flex min-h-[55vh] items-center justify-center py-8">
          <div className="w-full max-w-2xl border-2 border-foreground bg-card p-6 text-center shadow-[6px_6px_0_var(--foreground)] sm:p-10">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center border-2 border-foreground bg-secondary shadow-[4px_4px_0_var(--foreground)]">
              <Bookmark className="size-8 stroke-[2.5]" />
            </div>

            <div className="space-y-3">
              <span className="neo-label mx-auto">Watchlist</span>

              <h1 className="text-3xl font-black uppercase tracking-[-0.04em] sm:text-4xl">
                Sua lista está vazia
              </h1>

              <p className="mx-auto max-w-md text-sm font-medium leading-6 text-muted-foreground sm:text-base">
                Explore os filmes e adicione os títulos que você deseja
                assistir.
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                to="/discover"
                className={buttonVariants({
                  variant: "default",
                })}
              >
                Explorar filmes
              </Link>
            </div>
          </div>
        </section>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <section className="grid gap-4 border-b-2 border-foreground pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="space-y-3">
            <span className="neo-label">Minha lista</span>

            <h1 className="neo-title text-5xl sm:text-6xl">Watchlist</h1>

            <p className="max-w-xl text-sm font-medium text-muted-foreground sm:text-base">
              Seus filmes salvos para assistir depois.
            </p>
          </div>

          <div className="w-fit border-2 border-foreground bg-secondary px-4 py-3 shadow-[3px_3px_0_var(--foreground)]">
            <p className="text-xs font-black uppercase tracking-[0.08em]">
              {movies.length}{" "}
              {movies.length === 1 ? "filme salvo" : "filmes salvos"}
            </p>
          </div>
        </section>

        <WatchlistTable movies={movies} onRemove={handleRemove} />
      </div>
    </AppShell>
  );
}
