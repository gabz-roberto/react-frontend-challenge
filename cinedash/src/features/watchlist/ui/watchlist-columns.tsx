import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { ArrowUpDown, Star, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getTmdbImageUrl } from "@/shared/lib/tmdb-image";

import type { WatchlistMovie } from "../model/watchlist.store";
import { watchlistTableFeatures } from "../model/watchlist-table.features";

interface CreateWatchlistColumnsParams {
  onRemove: (movieId: number) => void;
}

type WatchlistColumn = ColumnDef<typeof watchlistTableFeatures, WatchlistMovie>;

export function createWatchlistColumns({
  onRemove,
}: CreateWatchlistColumnsParams): WatchlistColumn[] {
  return [
    {
      accessorKey: "title",

      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={column.getToggleSortingHandler()}
          className="-ml-2 border-0 px-2 shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-primary hover:shadow-none active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Título
          <ArrowUpDown className="size-4 stroke-[2.5]" />
        </Button>
      ),

      cell: ({ row }) => {
        const movie = row.original;

        const posterUrl = getTmdbImageUrl(movie.posterPath, "w185");

        return (
          <div className="flex min-w-56 items-center gap-4">
            <div className="shrink-0 border-2 border-foreground bg-muted shadow-[2px_2px_0_var(--foreground)]">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={`Poster de ${movie.title}`}
                  className="h-20 w-14 object-cover"
                />
              ) : (
                <div className="flex h-20 w-14 items-center justify-center px-1 text-center text-[9px] font-black uppercase leading-tight text-muted-foreground">
                  Sem poster
                </div>
              )}
            </div>

            <Link
              to="/movie/$movieId"
              params={{
                movieId: String(movie.id),
              }}
              className="max-w-56 font-black uppercase leading-tight tracking-[-0.02em] underline-offset-4 hover:underline"
            >
              {movie.title}
            </Link>
          </div>
        );
      },
    },

    {
      id: "genre",

      accessorFn: (movie) => movie.genres.join(", "),

      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={column.getToggleSortingHandler()}
          className="-ml-2 border-0 px-2 shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-primary hover:shadow-none active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Gênero
          <ArrowUpDown className="size-4 stroke-[2.5]" />
        </Button>
      ),

      cell: ({ row }) => {
        const genres = row.original.genres;

        if (genres.length === 0) {
          return (
            <span className="text-sm font-medium text-muted-foreground">
              Não informado
            </span>
          );
        }

        return (
          <div className="flex min-w-44 flex-wrap gap-1.5">
            {genres.map((genre) => (
              <span
                key={genre}
                className="border-2 border-foreground bg-accent px-2 py-1 text-[10px] font-black uppercase tracking-[0.04em] text-accent-foreground"
              >
                {genre}
              </span>
            ))}
          </div>
        );
      },
    },

    {
      accessorKey: "releaseDate",

      header: "Lançamento",

      cell: ({ row }) => {
        const releaseDate = row.original.releaseDate;

        if (!releaseDate) {
          return (
            <span className="text-sm font-medium text-muted-foreground">
              Não informado
            </span>
          );
        }

        return (
          <span className="whitespace-nowrap text-sm font-bold">
            {new Intl.DateTimeFormat("pt-BR").format(
              new Date(`${releaseDate}T00:00:00`),
            )}
          </span>
        );
      },
    },

    {
      accessorKey: "rating",

      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={column.getToggleSortingHandler()}
          className="-ml-2 border-0 px-2 shadow-none hover:translate-x-0 hover:translate-y-0 hover:bg-primary hover:shadow-none active:translate-x-0 active:translate-y-0 active:shadow-none"
        >
          Nota
          <ArrowUpDown className="size-4 stroke-[2.5]" />
        </Button>
      ),

      cell: ({ row }) => {
        const rating = row.original.rating;

        return (
          <span className="inline-flex items-center gap-1.5 border-2 border-foreground bg-primary px-2 py-1 text-xs font-black text-primary-foreground shadow-[2px_2px_0_var(--foreground)]">
            <Star className="size-3.5 fill-current" />

            {rating > 0 ? rating.toFixed(1) : "N/A"}
          </span>
        );
      },
    },

    {
      id: "actions",

      header: "Ações",

      enableSorting: false,

      cell: ({ row }) => {
        const movie = row.original;

        return (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="destructive"
              size="icon-sm"
              aria-label={`Remover ${movie.title} da Watchlist`}
              onClick={() => onRemove(movie.id)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
