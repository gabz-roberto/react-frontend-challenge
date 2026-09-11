import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { ArrowUpDown, Trash2 } from "lucide-react";

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
          onClick={column.getToggleSortingHandler()}
        >
          Título
          <ArrowUpDown className="size-4" />
        </Button>
      ),

      cell: ({ row }) => {
        const movie = row.original;

        const posterUrl = getTmdbImageUrl(movie.posterPath, "w185");

        return (
          <div className="flex items-center gap-3">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`Poster de ${movie.title}`}
                className="h-16 w-11 rounded object-cover"
              />
            ) : (
              <div className="flex h-16 w-11 items-center justify-center rounded bg-muted text-[10px] text-muted-foreground">
                Sem poster
              </div>
            )}

            <Link
              to="/movie/$movieId"
              params={{
                movieId: String(movie.id),
              }}
              className="font-medium hover:underline"
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
          onClick={column.getToggleSortingHandler()}
        >
          Gênero
          <ArrowUpDown className="size-4" />
        </Button>
      ),

      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.genres.length > 0
            ? row.original.genres.join(", ")
            : "Não informado"}
        </span>
      ),
    },

    {
      accessorKey: "releaseDate",

      header: "Lançamento",

      cell: ({ row }) => {
        const releaseDate = row.original.releaseDate;

        if (!releaseDate) {
          return <span className="text-muted-foreground">Não informado</span>;
        }

        return new Intl.DateTimeFormat("pt-BR").format(
          new Date(`${releaseDate}T00:00:00`),
        );
      },
    },

    {
      accessorKey: "rating",

      header: ({ column }) => (
        <Button
          type="button"
          variant="ghost"
          onClick={column.getToggleSortingHandler()}
        >
          Nota
          <ArrowUpDown className="size-4" />
        </Button>
      ),

      cell: ({ row }) => {
        const rating = row.original.rating;

        return <span>{rating > 0 ? rating.toFixed(1) : "N/A"}</span>;
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
              variant="ghost"
              size="icon"
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
