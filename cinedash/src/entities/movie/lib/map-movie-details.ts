import type { MovieDetailsDto } from "../api/movie.dto";
import type { MovieDetails } from "../model/movie.types";

export function mapMovieDetails(movie: MovieDetailsDto): MovieDetails {
  const trailer =
    movie.videos.results.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    movie.videos.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
    backdropPath: movie.backdrop_path,
    releaseDate: movie.release_date,
    rating: movie.vote_average,
    runtime: movie.runtime,

    genres: movie.genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })),

    cast: movie.credits.cast
      .sort((a, b) => a.order - b.order)
      .slice(0, 10)
      .map((person) => ({
        id: person.id,
        name: person.name,
        character: person.character,
        profilePath: person.profile_path,
      })),

    trailer: trailer
      ? {
          id: trailer.id,
          key: trailer.key,
          name: trailer.name,
          site: trailer.site,
        }
      : null,
  };
}
