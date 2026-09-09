import { useQuery } from "@tanstack/react-query";

import { getPopularMovies } from "./movie.service";
import { movieKeys } from "./movie.keys";

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),

    queryFn: ({ signal }) =>
      getPopularMovies({
        page,
        signal,
      }),
  });
}
