import { useMemo } from "react";

import { useTable } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { WatchlistMovie } from "../model/watchlist.store";

import { watchlistTableFeatures } from "../model/watchlist-table.features";

import { createWatchlistColumns } from "./watchlist-columns";

interface WatchlistTableProps {
  movies: WatchlistMovie[];
  onRemove: (movieId: number) => void;
}

export function WatchlistTable({ movies, onRemove }: WatchlistTableProps) {
  const columns = useMemo(
    () =>
      createWatchlistColumns({
        onRemove,
      }),
    [onRemove],
  );

  const table = useTable({
    features: watchlistTableFeatures,
    data: movies,
    columns,
  });

  return (
    <div className="overflow-hidden border-2 border-foreground bg-card shadow-[6px_6px_0_var(--foreground)]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b-2 border-foreground hover:bg-secondary"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-12 border-r-2 border-foreground px-4 text-xs font-black uppercase tracking-[0.08em] text-secondary-foreground last:border-r-0"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b-2 border-foreground transition-colors last:border-b-0 hover:bg-muted"
              >
                {row.getAllCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="border-r-2 border-foreground px-4 py-3 last:border-r-0"
                  >
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
