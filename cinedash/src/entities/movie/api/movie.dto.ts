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
