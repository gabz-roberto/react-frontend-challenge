import { useQuery } from "@tanstack/react-query";

import { genreKeys } from "./genre.keys";
import { getMovieGenres } from "./genre.service";

export function useGenres() {
  return useQuery({
    queryKey: genreKeys.movie(),
    queryFn: ({ signal }) => getMovieGenres({ signal }),

    staleTime: 1000 * 60 * 60 * 24,
  });
}
