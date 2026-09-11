import { Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { buttonVariants } from "@/components/ui/button";

import {
  useWatchlistStore,
} from "@/features/watchlist/model/watchlist.store";

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
        <div className="flex min-h-[55vh] flex-col items-center justify-center gap-4 text-center">
          <div className="rounded-full bg-muted p-4">
            <Bookmark className="size-8 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Sua Watchlist está vazia</h1>

            <p className="max-w-md text-muted-foreground">
              Explore os filmes e adicione os títulos que você deseja assistir.
            </p>
          </div>

          <Link to="/discover" className={buttonVariants()}>
            Explorar filmes
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Watchlist</h1>

          <p className="text-muted-foreground">
            {movies.length}{" "}
            {movies.length === 1 ? "filme salvo" : "filmes salvos"}
          </p>
        </div>

        <WatchlistTable movies={movies} onRemove={handleRemove} />
      </div>
    </AppShell>
  );
}
