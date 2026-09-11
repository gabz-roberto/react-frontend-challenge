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

export interface MovieGenre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string | null;
}

export interface MovieTrailer {
  id: string;
  key: string;
  name: string;
  site: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string;
  rating: number;
  runtime: number | null;
  genres: MovieGenre[];
  cast: CastMember[];
  trailer: MovieTrailer | null;
}
