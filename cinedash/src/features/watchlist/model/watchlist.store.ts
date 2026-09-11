import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WatchlistMovie {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  rating: number;
  genres: string[];
}

interface WatchlistState {
  movies: WatchlistMovie[];
  addMovie: (movie: WatchlistMovie) => void;
  removeMovie: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      movies: [],

      addMovie: (movie) => {
        const alreadyExists = get().movies.some((item) => item.id === movie.id);

        if (alreadyExists) {
          return;
        }

        set((state) => ({
          movies: [...state.movies, movie],
        }));
      },

      removeMovie: (movieId) => {
        set((state) => ({
          movies: state.movies.filter((movie) => movie.id !== movieId),
        }));
      },

      isInWatchlist: (movieId) => {
        return get().movies.some((movie) => movie.id === movieId);
      },
    }),
    {
      name: "cinedash-watchlist",
    },
  ),
);
