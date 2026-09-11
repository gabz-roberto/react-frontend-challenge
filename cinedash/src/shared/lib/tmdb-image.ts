const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

type ImageSize = "w185" | "w342" | "w500" | "w780" | "w1280" | "original";

export function getTmdbImageUrl(path: string | null, size: ImageSize = "w500") {
  if (!path) {
    return null;
  }

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getTmdbPosterUrl(
  posterPath: string | null,
  size: ImageSize = "w500",
) {
  return getTmdbImageUrl(posterPath, size);
}
