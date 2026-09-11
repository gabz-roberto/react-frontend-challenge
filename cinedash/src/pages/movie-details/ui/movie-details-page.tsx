import { ArrowLeft, Clock, Star } from "lucide-react";
import { getRouteApi, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMovieDetails } from "@/entities/movie/api/use-movie-details";
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
            <ArrowLeft />
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

  const posterUrl = getTmdbImageUrl(movie.posterPath, "w500");

  const backdropUrl = getTmdbImageUrl(movie.backdropPath, "w1280");

  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : null;

  return (
    <AppShell>
      <div className="space-y-8">
        <Link
          to="/discover"
          className={buttonVariants({
            variant: "ghost",
          })}
        >
          <ArrowLeft />
          Voltar
        </Link>

        {backdropUrl && (
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={backdropUrl}
              alt=""
              className="h-[280px] w-full object-cover md:h-[420px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <div>
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`Poster de ${movie.title}`}
                className="w-full rounded-xl object-cover shadow-lg"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
                Sem poster
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {movie.title}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {releaseYear && <span>{releaseYear}</span>}

                  {movie.runtime && (
                    <span className="flex items-center gap-1">
                      <Clock className="size-4" />
                      {movie.runtime} min
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <Star className="size-4" />

                    {movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
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
                {movie.overview || "Sinopse não disponível."}
              </p>
            </div>
          </div>
        </div>

        {movie.cast.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Elenco principal</h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
              {movie.cast.map((person) => {
                const profileUrl = getTmdbImageUrl(person.profilePath, "w185");

                return (
                  <div key={person.id} className="space-y-2">
                    {profileUrl ? (
                      <img
                        src={profileUrl}
                        alt={person.name}
                        loading="lazy"
                        className="aspect-[2/3] w-full rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[2/3] items-center justify-center rounded-lg bg-muted px-2 text-center text-xs text-muted-foreground">
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

        {movie.trailer && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Trailer</h2>

            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                title={movie.trailer.name}
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
