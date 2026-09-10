export const genreKeys = {
  all: ["genres"] as const,

  movie: () => [...genreKeys.all, "movie"] as const,
};
