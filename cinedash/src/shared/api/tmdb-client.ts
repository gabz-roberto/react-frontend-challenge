import { env } from "@/shared/config/env";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

interface RequestOptions {
  signal?: AbortSignal;
}

export async function tmdbClient<T>(
  endpoint: string,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${env.tmdbAccessToken}`,
      Accept: "application/json",
    },
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
