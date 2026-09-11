import { beforeEach, describe, expect, it } from "vitest";

import { useWatchlistStore, type WatchlistMovie } from "./watchlist.store";

const movie: WatchlistMovie = {
  id: 1,
  title: "Interstellar",
  posterPath: "/poster.jpg",
  releaseDate: "2014-11-07",
  rating: 8.7,
  genres: ["Ficção científica", "Drama"],
};

describe("useWatchlistStore", () => {
  beforeEach(() => {
    useWatchlistStore.setState({
      movies: [],
    });

    localStorage.clear();
  });

  it("adiciona um filme à watchlist", () => {
    useWatchlistStore.getState().addMovie(movie);

    expect(useWatchlistStore.getState().movies).toHaveLength(1);

    expect(useWatchlistStore.getState().movies[0]).toEqual(movie);
  });

  it("não adiciona o mesmo filme duas vezes", () => {
    const { addMovie } = useWatchlistStore.getState();

    addMovie(movie);
    addMovie(movie);

    expect(useWatchlistStore.getState().movies).toHaveLength(1);
  });

  it("remove um filme da watchlist", () => {
    const { addMovie, removeMovie } = useWatchlistStore.getState();

    addMovie(movie);
    removeMovie(movie.id);

    expect(useWatchlistStore.getState().movies).toHaveLength(0);
  });

  it("identifica se um filme está na watchlist", () => {
    const { addMovie, isInWatchlist } = useWatchlistStore.getState();

    expect(isInWatchlist(movie.id)).toBe(false);

    addMovie(movie);

    expect(useWatchlistStore.getState().isInWatchlist(movie.id)).toBe(true);
  });
});
