import { tmdbClient } from "@/shared/api/tmdb-client";

import type { Genre } from "../model/genre.types";
import type { GenresResponseDto } from "./genre.dto";

interface GetGenresParams {
  signal?: AbortSignal;
}

export async function getMovieGenres({ signal }: GetGenresParams = {}): Promise<
  Genre[]
> {
  const response = await tmdbClient<GenresResponseDto>(
    "/genre/movie/list?language=pt-BR",
    { signal },
  );

  return response.genres;
}
