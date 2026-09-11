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
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
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
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
