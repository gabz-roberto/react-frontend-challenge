import { useState } from "react";
import { getRouteApi } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { useGenres } from "@/entities/genre/api/use-genres";
import { useDiscoverMovies } from "@/entities/movie/api/use-discover-movies";
import { usePopularMovies } from "@/entities/movie/api/use-popular-movies";
import { useSearchMovies } from "@/entities/movie/api/use-search-movies";

import { MovieFilters } from "@/features/movie-filters/ui/movie-filters";
import { MoviePagination } from "@/features/movie-pagination/ui/movie-pagination";
import { MovieSearchInput } from "@/features/movie-search/ui/movie-search-input";

import { useDebounce } from "@/shared/hooks/use-debounce";

import { AppShell } from "@/widgets/app-shell/app-shell";
import { MovieGrid } from "@/widgets/movie-grid/movie-grid";
import { MovieGridSkeleton } from "@/widgets/movie-grid/movie-grid-skeleton";

const discoverRoute = getRouteApi("/discover");

export function DiscoverPage() {
  const [search, setSearch] = useState("");

  const searchParams = discoverRoute.useSearch();
  const navigate = discoverRoute.useNavigate();

  const page = searchParams.page ?? 1;

  const debouncedSearch = useDebounce(search.trim(), 500);

  const isSearching = debouncedSearch.length > 0;

  const filters = {
    genre: searchParams.genre,
    year: searchParams.year,
    minRating: searchParams.rating,
  };

  const hasFilters =
    filters.genre !== undefined ||
    filters.year !== undefined ||
    filters.minRating !== undefined;

  const genresQuery = useGenres();

  const popularQuery = usePopularMovies(page);

  const discoverQuery = useDiscoverMovies({
    filters,
    page,
  });

  const searchQuery = useSearchMovies({
    query: debouncedSearch,
    page,
  });

  const activeQuery = isSearching
    ? searchQuery
    : hasFilters
      ? discoverQuery
      : popularQuery;

  const { data, isLoading, isError, error, refetch, isFetching } = activeQuery;

  return (
    <AppShell>
      <div className="space-y-10">
        <section className="grid gap-6 border-b-2 border-foreground pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-4">
            <span className="neo-label">Catálogo</span>

            <div className="space-y-3">
              <h1 className="neo-title max-w-3xl text-5xl sm:text-6xl lg:text-7xl">
                Explore o cinema
              </h1>

              <p className="max-w-2xl text-base font-medium text-muted-foreground sm:text-lg">
                Descubra filmes populares e pesquise títulos.
              </p>
            </div>
          </div>

          <div className="hidden border-2 border-foreground bg-secondary px-5 py-4 text-right shadow-[4px_4px_0_var(--foreground)] lg:block">
            <p className="text-xs font-black uppercase tracking-[0.12em]">
              CineDash
            </p>

            <p className="mt-1 text-sm font-semibold">Filmes em destaque</p>
          </div>
        </section>

        <section className="space-y-5 border-2 border-foreground bg-card p-4 shadow-[5px_5px_0_var(--foreground)] sm:p-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
              Busca e filtros
            </span>

            <h2 className="text-xl font-black uppercase tracking-[-0.03em]">
              Encontre seu próximo filme
            </h2>
          </div>

          <MovieSearchInput
            value={search}
            onChange={(value) => {
              setSearch(value);

              navigate({
                search: (previous) => ({
                  ...previous,
                  page: undefined,
                }),
              });
            }}
          />

          <MovieFilters
            filters={filters}
            genres={genresQuery.data ?? []}
            onGenreChange={(genre) =>
              navigate({
                search: (previous) => ({
                  ...previous,
                  genre,
                  page: undefined,
                }),
              })
            }
            onYearChange={(year) =>
              navigate({
                search: (previous) => ({
                  ...previous,
                  year,
                  page: undefined,
                }),
              })
            }
            onRatingChange={(rating) =>
              navigate({
                search: (previous) => ({
                  ...previous,
                  rating,
                  page: undefined,
                }),
              })
            }
            onClear={() =>
              navigate({
                search: {},
              })
            }
          />
        </section>

        {isLoading && <MovieGridSkeleton />}

        {isError && (
          <section className="border-2 border-destructive bg-card p-6 shadow-[5px_5px_0_var(--destructive)]">
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="inline-flex border-2 border-foreground bg-destructive px-2 py-1 text-xs font-black uppercase tracking-[0.08em] text-white">
                  Erro
                </span>

                <h2 className="text-xl font-black uppercase tracking-[-0.03em]">
                  Não foi possível carregar os filmes
                </h2>

                <p className="max-w-2xl text-sm font-medium text-muted-foreground">
                  {error.message}
                </p>
              </div>

              <Button variant="outline" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            </div>
          </section>
        )}

        {data && (
          <section className="space-y-6">
            {(isSearching || hasFilters) && (
              <div className="flex flex-wrap items-center gap-3">
                {isSearching && (
                  <div className="inline-flex border-2 border-foreground bg-accent px-3 py-2 text-sm font-bold text-accent-foreground shadow-[3px_3px_0_var(--foreground)]">
                    Resultados para "{debouncedSearch}"
                  </div>
                )}

                {!isSearching && hasFilters && (
                  <div className="inline-flex border-2 border-foreground bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground shadow-[3px_3px_0_var(--foreground)]">
                    Resultados filtrados
                  </div>
                )}
              </div>
            )}

            {data.results.length > 0 ? (
              <>
                <MovieGrid movies={data.results} />

                <MoviePagination
                  page={page}
                  totalPages={data.totalPages}
                  disabled={isFetching}
                  onPageChange={(newPage: number) =>
                    navigate({
                      search: (previous) => ({
                        ...previous,
                        page: newPage === 1 ? undefined : newPage,
                      }),
                    })
                  }
                />
              </>
            ) : (
              <div className="border-2 border-foreground bg-card p-8 text-center shadow-[5px_5px_0_var(--foreground)] sm:p-12">
                <div className="mx-auto max-w-lg space-y-3">
                  <span className="neo-label mx-auto">Sem resultados</span>

                  <p className="text-xl font-black uppercase tracking-[-0.03em]">
                    Nenhum filme encontrado
                  </p>

                  <p className="text-sm font-medium text-muted-foreground">
                    Tente alterar a busca ou ajustar os filtros.
                  </p>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </AppShell>
  );
}
