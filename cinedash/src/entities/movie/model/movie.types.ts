export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  rating: number;
  genreIds: number[];
}

export interface PaginatedMovies {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}
