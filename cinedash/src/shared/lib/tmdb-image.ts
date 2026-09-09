const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

type PosterSize = "w342" | "w500" | "w780";

export function getTmdbPosterUrl(
  posterPath: string | null,
  size: PosterSize = "w500",
) {
  if (!posterPath) {
    return null;
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}
