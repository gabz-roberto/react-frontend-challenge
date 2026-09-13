import { useQuery } from "@tanstack/react-query";

import { movieKeys } from "./movie.keys";
import { getMovieDetails } from "./movie.service";

interface UseMovieDetailsParams {
  movieId: number;
}

export function useMovieDetails({ movieId }: UseMovieDetailsParams) {
  return useQuery({
    queryKey: movieKeys.detail(movieId),

    queryFn: ({ signal }) =>
      getMovieDetails({
        movieId,
        signal,
      }),

    enabled: Number.isFinite(movieId) && movieId > 0,
  });
}
