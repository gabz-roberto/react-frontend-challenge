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
      className="
        group
        block
        overflow-hidden
        rounded-md
        border-2
        border-foreground
        bg-card
        text-card-foreground
        shadow-[5px_5px_0_var(--foreground)]
        transition-[transform,box-shadow]
        duration-150
        hover:-translate-x-1
        hover:-translate-y-1
        hover:shadow-[8px_8px_0_var(--foreground)]
        focus-visible:-translate-x-1
        focus-visible:-translate-y-1
        focus-visible:shadow-[8px_8px_0_var(--foreground)]
        focus-visible:outline-none
      "
    >
      <div className="relative aspect-[2/3] overflow-hidden border-b-2 border-foreground bg-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`Pôster de ${movie.title}`}
            className="
              h-full
              w-full
              object-cover
              transition
              duration-300
              group-hover:scale-[1.03]
            "
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-sm font-bold uppercase tracking-[0.05em] text-muted-foreground">
            Pôster indisponível
          </div>
        )}

        <div className="absolute left-3 top-3 border-2 border-foreground bg-secondary px-2 py-1 text-xs font-black text-secondary-foreground shadow-[2px_2px_0_var(--foreground)]">
          {releaseYear}
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-1 border-2 border-foreground bg-primary px-2 py-1 text-xs font-black text-primary-foreground shadow-[2px_2px_0_var(--foreground)]">
          <Star className="size-3.5 fill-current" />

          <span>{movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}</span>
        </div>
      </div>

      <div className="p-4">
        <h2 className="line-clamp-2 text-base font-black uppercase leading-tight tracking-[-0.03em]">
          {movie.title}
        </h2>

        <div className="mt-3 h-1.5 w-12 bg-primary" />
      </div>
    </Link>
  );
}
