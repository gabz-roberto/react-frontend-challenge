export interface MovieDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MoviesResponseDto {
  page: number;
  results: MovieDto[];
  total_pages: number;
  total_results: number;
}

export interface MovieGenreDto {
  id: number;
  name: string;
}

export interface CastMemberDto {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface MovieVideoDto {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieDetailsDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number | null;

  genres: MovieGenreDto[];

  credits: {
    cast: CastMemberDto[];
  };

  videos: {
    results: MovieVideoDto[];
  };
}
