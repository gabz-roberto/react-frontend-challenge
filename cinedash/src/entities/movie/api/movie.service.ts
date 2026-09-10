import { tmdbClient } from "@/shared/api/tmdb-client";

import { mapMovie } from "../lib/map-movie";
import type { PaginatedMovies } from "../model/movie.types";
import type { MoviesResponseDto } from "./movie.dto";

interface GetPopularMoviesParams {
  page?: number;
  signal?: AbortSignal;
}

interface SearchMoviesParams {
  query: string;
  page?: number;
  signal?: AbortSignal;
}

export async function getPopularMovies({
  page = 1,
  signal,
}: GetPopularMoviesParams = {}): Promise<PaginatedMovies> {
  const response = await tmdbClient<MoviesResponseDto>(
    `/movie/popular?page=${page}&language=pt-BR`,
    { signal },
  );

  return {
    page: response.page,
    results: response.results.map(mapMovie),
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}

export async function searchMovies({
  query,
  page = 1,
  signal,
}: SearchMoviesParams): Promise<PaginatedMovies> {
  const searchParams = new URLSearchParams({
    query,
    page: String(page),
    language: "pt-BR",
    include_adult: "false",
  });

  const response = await tmdbClient<MoviesResponseDto>(
    `/search/movie?${searchParams.toString()}`,
    { signal },
  );

  return {
    page: response.page,
    results: response.results.map(mapMovie),
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}
