export const movieKeys = {
  all: ["movies"] as const,

  lists: () => [...movieKeys.all, "list"] as const,

  popular: (page: number) => [...movieKeys.lists(), "popular", page] as const,

  details: () => [...movieKeys.all, "detail"] as const,

  detail: (id: number) => [...movieKeys.details(), id] as const,
};
