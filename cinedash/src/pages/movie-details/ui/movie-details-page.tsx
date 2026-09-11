import { ArrowLeft, Bookmark, BookmarkCheck, Clock, Star } from "lucide-react";

import { toast } from "sonner";

import { getRouteApi, Link } from "@tanstack/react-router";

import { Button, buttonVariants } from "@/components/ui/button";

import { useMovieDetails } from "@/entities/movie/api/use-movie-details";

import { mapMovieToWatchlist } from "@/features/watchlist/lib/map-movie-to-watchlist";
import { useWatchlistStore } from "@/features/watchlist/model/watchlist.store";

import { getTmdbImageUrl } from "@/shared/lib/tmdb-image";

import { AppShell } from "@/widgets/app-shell/app-shell";

import { MovieDetailsSkeleton } from "./movie-details-skeleton";

const movieRoute = getRouteApi("/movie/$movieId");

export function MovieDetailsPage() {
  const { movieId } = movieRoute.useParams();

  const parsedMovieId = Number(movieId);

  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useMovieDetails({
    movieId: parsedMovieId,
  });

  const movies = useWatchlistStore((state) => state.movies);

  const addMovie = useWatchlistStore((state) => state.addMovie);

  const removeMovie = useWatchlistStore((state) => state.removeMovie);

  if (isLoading) {
    return (
      <AppShell>
        <MovieDetailsSkeleton />
      </AppShell>
    );
  }

  if (isError) {
    return (
      <AppShell>
        <div className="space-y-6">
          <Link
            to="/discover"
            className={buttonVariants({
              variant: "ghost",
            })}
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>

          <div className="rounded-xl border p-8">
            <div className="space-y-4">
              <div>
                <h1 className="text-xl font-semibold">
                  Não foi possível carregar o filme
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                  {error.message}
                </p>
              </div>

              <Button variant="outline" onClick={() => refetch()}>
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!movie) {
    return null;
  }

  const currentMovie = movie;

  const isInWatchlist = movies.some((item) => item.id === currentMovie.id);

  const posterUrl = getTmdbImageUrl(currentMovie.posterPath, "w500");

  const backdropUrl = getTmdbImageUrl(currentMovie.backdropPath, "w1280");

  const releaseYear = currentMovie.releaseDate
    ? new Date(currentMovie.releaseDate).getFullYear()
    : null;

  function handleWatchlistToggle() {
    if (isInWatchlist) {
      removeMovie(currentMovie.id);

      toast.warning("Filme removido da Lista", {
        description: currentMovie.title,
      });

      return;
    }

    addMovie(mapMovieToWatchlist(currentMovie));

    toast.success("Filme adicionado à Lista", {
      description: currentMovie.title,
    });
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <Link
          to="/discover"
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Link>

        {backdropUrl && (
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={backdropUrl}
              alt=""
              className="h-70 w-full object-cover md:h-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <div>
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`Poster de ${currentMovie.title}`}
                className="w-full rounded-xl object-cover shadow-lg"
              />
            ) : (
              <div className="flex aspect-2/3 items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
                Sem poster
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {currentMovie.title}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {releaseYear && <span>{releaseYear}</span>}

                  {currentMovie.runtime && (
                    <span className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {currentMovie.runtime} min
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <Star className="size-4" />

                    {currentMovie.rating > 0
                      ? currentMovie.rating.toFixed(1)
                      : "N/A"}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant={isInWatchlist ? "secondary" : "default"}
                onClick={handleWatchlistToggle}
              >
                {isInWatchlist ? (
                  <>
                    <BookmarkCheck className="size-4" />
                    Remover da Watchlist
                  </>
                ) : (
                  <>
                    <Bookmark className="size-4" />
                    Adicionar à Watchlist
                  </>
                )}
              </Button>

              <div className="flex flex-wrap gap-2">
                {currentMovie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border px-3 py-1 text-xs"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Sinopse</h2>

              <p className="leading-7 text-muted-foreground">
                {currentMovie.overview || "Sinopse não disponível."}
              </p>
            </div>
          </div>
        </div>

        {currentMovie.cast.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Elenco principal</h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
              {currentMovie.cast.map((person) => {
                const profileUrl = getTmdbImageUrl(person.profilePath, "w185");

                return (
                  <div key={person.id} className="space-y-2">
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt={person.name}
                        loading="lazy"
                        className="aspect-2/3 w-full rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex aspect-2/3 items-center justify-center rounded-lg bg-muted px-2 text-center text-xs text-muted-foreground">
                        Sem foto
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-medium">{person.name}</p>

                      <p className="text-xs text-muted-foreground">
                        {person.character}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {currentMovie.trailer && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Trailer</h2>

            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${currentMovie.trailer.key}`}
                title={currentMovie.trailer.name}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
