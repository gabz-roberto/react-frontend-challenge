import { useQuery } from "@tanstack/react-query";

import { movieKeys } from "./movie.keys";
import { searchMovies } from "./movie.service";

interface UseSearchMoviesParams {
  query: string;
  page?: number;
}

export function useSearchMovies({ query, page = 1 }: UseSearchMoviesParams) {
  return useQuery({
    queryKey: movieKeys.search(query, page),

    queryFn: ({ signal }) =>
      searchMovies({
        query,
        page,
        signal,
      }),

    enabled: query.trim().length > 0,
  });
}
