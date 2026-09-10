import { tmdbClient } from "@/shared/api/tmdb-client";

import { mapMovie } from "../lib/map-movie";
import type { PaginatedMovies } from "../model/movie.types";
import type { MoviesResponseDto } from "./movie.dto";

import type { MovieFilters } from "@/features/movie-filters/model/movie-filters.types";

interface GetPopularMoviesParams {
  page?: number;
  signal?: AbortSignal;
}

interface SearchMoviesParams {
  query: string;
  page?: number;
  signal?: AbortSignal;
}

interface DiscoverMoviesParams {
  filters: MovieFilters;
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

export async function discoverMovies({
  filters,
  page = 1,
  signal,
}: DiscoverMoviesParams): Promise<PaginatedMovies> {
  const searchParams = new URLSearchParams({
    page: String(page),
    language: "pt-BR",
    sort_by: "popularity.desc",
    include_adult: "false",
  });

  if (filters.genre) {
    searchParams.set("with_genres", String(filters.genre));
  }

  if (filters.year) {
    searchParams.set("primary_release_year", String(filters.year));
  }

  if (filters.minRating !== undefined) {
    searchParams.set("vote_average.gte", String(filters.minRating));
  }

  const response = await tmdbClient<MoviesResponseDto>(
    `/discover/movie?${searchParams.toString()}`,
    { signal },
  );

  return {
    page: response.page,
    results: response.results.map(mapMovie),
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}
