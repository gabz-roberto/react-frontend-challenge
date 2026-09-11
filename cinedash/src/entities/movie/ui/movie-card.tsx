import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";

import type { Movie } from "../model/movie.types";

import { getMovieDetails } from "@/entities/movie/api/movie.service";
import { movieKeys } from "@/entities/movie/api/movie.keys";

import { getTmdbPosterUrl } from "@/shared/lib/tmdb-image";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const queryClient = useQueryClient();

  const posterUrl = getTmdbPosterUrl(movie.posterPath);

  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "N/A";

  function prefetchMovieDetails() {
    void queryClient.prefetchQuery({
      queryKey: movieKeys.detail(movie.id),
      queryFn: ({ signal }) =>
        getMovieDetails({
          movieId: movie.id,
          signal,
        }),
      staleTime: 1000 * 60 * 5,
    });
  }

  return (
    <Link
      to="/movie/$movieId"
      params={{
        movieId: String(movie.id),
      }}
      onMouseEnter={prefetchMovieDetails}
      onFocus={prefetchMovieDetails}
      className="group overflow-hidden rounded-xl border bg-card transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-[2/3] overflow-hidden bg-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Pôster de ${movie.title}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
            Pôster indisponível
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <h2 className="line-clamp-1 font-semibold">{movie.title}</h2>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{releaseYear}</span>

          <div className="flex items-center gap-1">
            <Star className="size-4" />

            <span>{movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
