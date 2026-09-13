const tmdbAccessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if (!tmdbAccessToken) {
  throw new Error("VITE_TMDB_ACCESS_TOKEN is not configured");
}

export const env = {
  tmdbAccessToken,
} as const;
