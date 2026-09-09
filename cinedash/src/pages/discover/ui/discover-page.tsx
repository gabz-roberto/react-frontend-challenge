import { Button } from "@/components/ui/button";
import { usePopularMovies } from "@/entities/movie/api/use-popular-movies";
import { AppShell } from "@/widgets/app-shell/app-shell";
import { MovieGrid } from "@/widgets/movie-grid/movie-grid";
import { MovieGridSkeleton } from "@/widgets/movie-grid/movie-grid-skeleton";

export function DiscoverPage() {
  const { data, isLoading, isError, error, refetch } = usePopularMovies();

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Discover</h1>

          <p className="text-muted-foreground">
            Explore os filmes populares do momento.
          </p>
        </div>

        {isLoading && <MovieGridSkeleton />}

        {isError && (
          <div className="rounded-lg border p-6">
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold">
                  Não foi possível carregar os filmes
                </h2>

                <p className="text-sm text-muted-foreground">{error.message}</p>
              </div>

              <Button variant="outline" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            </div>
          </div>
        )}

        {data && <MovieGrid movies={data.results} />}
      </div>
    </AppShell>
  );
}
