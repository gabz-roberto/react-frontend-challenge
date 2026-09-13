import type { MovieFilters } from "@/features/movie-filters/model/movie-filters.types";

export const movieKeys = {
  all: ["movies"] as const,

  lists: () => [...movieKeys.all, "list"] as const,

  popular: (page: number) => [...movieKeys.lists(), "popular", page] as const,

  search: (query: string, page: number) =>
    [...movieKeys.lists(), "search", query, page] as const,

  details: () => [...movieKeys.all, "detail"] as const,

  detail: (id: number) => [...movieKeys.details(), id] as const,

  discover: (filters: MovieFilters, page: number) =>
    [...movieKeys.lists(), "discover", filters, page] as const,
};
