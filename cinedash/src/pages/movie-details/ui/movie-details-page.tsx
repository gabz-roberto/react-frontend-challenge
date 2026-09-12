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

          <div className="border-2 border-destructive bg-card p-6 shadow-[5px_5px_0_var(--destructive)] sm:p-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="inline-flex border-2 border-foreground bg-destructive px-2 py-1 text-xs font-black uppercase tracking-[0.08em] text-white">
                  Erro
                </span>

                <h1 className="text-xl font-black uppercase tracking-[-0.03em]">
                  Não foi possível carregar o filme
                </h1>

                <p className="text-sm font-medium text-muted-foreground">
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
      <div className="space-y-10">
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
          <section className="relative overflow-hidden border-2 border-foreground bg-muted shadow-[6px_6px_0_var(--foreground)]">
            <img
              src={backdropUrl}
              alt=""
              className="h-64 w-full object-cover sm:h-80 md:h-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6">
              {releaseYear && (
                <span className="border-2 border-foreground bg-secondary px-3 py-1.5 text-xs font-black uppercase tracking-[0.08em] text-secondary-foreground shadow-[2px_2px_0_#111]">
                  {releaseYear}
                </span>
              )}

              {currentMovie.runtime && (
                <span className="flex items-center gap-1.5 border-2 border-foreground bg-card px-3 py-1.5 text-xs font-black uppercase tracking-[0.06em] text-card-foreground shadow-[2px_2px_0_#111]">
                  <Clock className="size-3.5" />
                  {currentMovie.runtime} min
                </span>
              )}

              <span className="flex items-center gap-1.5 border-2 border-foreground bg-primary px-3 py-1.5 text-xs font-black text-primary-foreground shadow-[2px_2px_0_#111]">
                <Star className="size-3.5 fill-current" />
                {currentMovie.rating > 0
                  ? currentMovie.rating.toFixed(1)
                  : "N/A"}
              </span>
            </div>
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
          <div className="lg:sticky lg:top-6">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`Poster de ${currentMovie.title}`}
                className="w-full border-2 border-foreground object-cover shadow-[6px_6px_0_var(--foreground)]"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center border-2 border-foreground bg-muted p-6 text-center text-sm font-bold uppercase tracking-[0.06em] text-muted-foreground shadow-[6px_6px_0_var(--foreground)]">
                Sem poster
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-5 border-b-2 border-foreground pb-8">
              <div className="space-y-3">
                <span className="neo-label">Ficha do filme</span>

                <h1 className="neo-title max-w-4xl text-4xl sm:text-5xl md:text-6xl">
                  {currentMovie.title}
                </h1>
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

              {currentMovie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentMovie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="border-2 border-foreground bg-accent px-3 py-1.5 text-xs font-black uppercase tracking-[0.05em] text-accent-foreground shadow-[2px_2px_0_var(--foreground)]"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <section className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-2 bg-primary" />

                <h2 className="text-2xl font-black uppercase tracking-[-0.03em]">
                  Sinopse
                </h2>
              </div>

              <div className="border-2 border-foreground bg-card p-5 shadow-[4px_4px_0_var(--foreground)] sm:p-6">
                <p className="max-w-4xl text-base font-medium leading-7 text-muted-foreground">
                  {currentMovie.overview || "Sinopse não disponível."}
                </p>
              </div>
            </section>
          </div>
        </section>

        {currentMovie.cast.length > 0 && (
          <section className="space-y-6 border-t-2 border-foreground pt-8">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
                Créditos
              </span>

              <h2 className="text-3xl font-black uppercase tracking-[-0.04em]">
                Elenco principal
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
              {currentMovie.cast.map((person) => {
                const profileUrl = getTmdbImageUrl(person.profilePath, "w185");

                return (
                  <div key={person.id} className="space-y-3">
                    <div className="overflow-hidden border-2 border-foreground bg-muted shadow-[3px_3px_0_var(--foreground)]">
                      {profileUrl ? (
                        <img
                          src={profileUrl}
                          alt={person.name}
                          loading="lazy"
                          className="aspect-[2/3] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[2/3] items-center justify-center px-2 text-center text-xs font-bold uppercase tracking-[0.05em] text-muted-foreground">
                          Sem foto
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="line-clamp-2 text-sm font-black uppercase leading-tight">
                        {person.name}
                      </p>

                      <p className="mt-1 line-clamp-2 text-xs font-medium text-muted-foreground">
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
          <section className="space-y-6 border-t-2 border-foreground pt-8">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-[0.12em] text-muted-foreground">
                Vídeo
              </span>

              <h2 className="text-3xl font-black uppercase tracking-[-0.04em]">
                Trailer
              </h2>
            </div>

            <div className="aspect-video overflow-hidden border-2 border-foreground bg-black shadow-[6px_6px_0_var(--foreground)]">
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
