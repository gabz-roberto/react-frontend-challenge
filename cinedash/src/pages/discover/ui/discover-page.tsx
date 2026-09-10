import { useState } from "react";

import { Button } from "@/components/ui/button";
import { usePopularMovies } from "@/entities/movie/api/use-popular-movies";
import { useSearchMovies } from "@/entities/movie/api/use-search-movies";
import { MovieSearchInput } from "@/features/movie-search/ui/movie-search-input";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { AppShell } from "@/widgets/app-shell/app-shell";
import { MovieGrid } from "@/widgets/movie-grid/movie-grid";
import { MovieGridSkeleton } from "@/widgets/movie-grid/movie-grid-skeleton";

export function DiscoverPage() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search.trim(), 500);

  const isSearching = debouncedSearch.length > 0;

  const popularQuery = usePopularMovies();

  const searchQuery = useSearchMovies({
    query: debouncedSearch,
  });

  const activeQuery = isSearching ? searchQuery : popularQuery;

  const { data, isLoading, isError, error, refetch } = activeQuery;

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Discover</h1>

          <p className="text-muted-foreground">
            Explore os filmes populares do momento.
          </p>
        </div>

        <MovieSearchInput value={search} onChange={setSearch} />

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

        {data && (
          <>
            {isSearching && (
              <p className="text-sm text-muted-foreground">
                Resultados para "{debouncedSearch}"
              </p>
            )}

            {data.results.length > 0 ? (
              <MovieGrid movies={data.results} />
            ) : (
              <div className="rounded-lg border p-8 text-center">
                <p className="font-medium">Nenhum filme encontrado</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Tente buscar por outro título.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
