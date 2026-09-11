import type { MovieDetails } from "@/entities/movie/model/movie.types";

import type { WatchlistMovie } from "../model/watchlist.store";

export function mapMovieToWatchlist(movie: MovieDetails): WatchlistMovie {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.posterPath,
    releaseDate: movie.releaseDate,
    rating: movie.rating,
    genres: movie.genres.map((genre) => genre.name),
  };
}
