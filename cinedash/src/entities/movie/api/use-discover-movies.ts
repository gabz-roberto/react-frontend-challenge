import { useQuery } from "@tanstack/react-query";

import type { MovieFilters } from "@/features/movie-filters/model/movie-filters.types";

import { movieKeys } from "./movie.keys";
import { discoverMovies } from "./movie.service";

interface UseDiscoverMoviesParams {
  filters: MovieFilters;
  page?: number;
}

export function useDiscoverMovies({
  filters,
  page = 1,
}: UseDiscoverMoviesParams) {
  return useQuery({
    queryKey: movieKeys.discover(filters, page),

    queryFn: ({ signal }) =>
      discoverMovies({
        filters,
        page,
        signal,
      }),
  });
}
