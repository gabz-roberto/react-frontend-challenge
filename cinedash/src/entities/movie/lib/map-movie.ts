import type { MovieDto } from "../api/movie.dto";
import type { Movie } from "../model/movie.types";

export function mapMovie(dto: MovieDto): Movie {
  return {
    id: dto.id,
    title: dto.title,
    overview: dto.overview,
    posterPath: dto.poster_path,
    backdropPath: dto.backdrop_path,
    releaseDate: dto.release_date,
    rating: dto.vote_average,
    genreIds: dto.genre_ids,
  };
}
