import { describe, expect, it, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/test/render-with-router";

import type { WatchlistMovie } from "../model/watchlist.store";

import { WatchlistTable } from "./watchlist-table";

const movies: WatchlistMovie[] = [
  {
    id: 1,
    title: "Interstellar",
    posterPath: null,
    releaseDate: "2014-11-07",
    rating: 8.7,
    genres: ["Ficção científica", "Drama"],
  },
  {
    id: 2,
    title: "Batman Begins",
    posterPath: null,
    releaseDate: "2005-06-15",
    rating: 8.2,
    genres: ["Ação", "Drama"],
  },
  {
    id: 3,
    title: "Dune",
    posterPath: null,
    releaseDate: "2021-10-22",
    rating: 8.0,
    genres: ["Ficção científica", "Aventura"],
  },
];

describe("WatchlistTable", () => {
  it("renderiza os filmes da watchlist", async () => {
    await renderWithRouter(
      <WatchlistTable movies={movies} onRemove={vi.fn()} />,
    );

    expect(screen.getByText("Interstellar")).toBeInTheDocument();

    expect(screen.getByText("Batman Begins")).toBeInTheDocument();

    expect(screen.getByText("Dune")).toBeInTheDocument();
  });

  it("executa a remoção com o id correto", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    await renderWithRouter(
      <WatchlistTable movies={movies} onRemove={onRemove} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Remover Interstellar da Watchlist",
      }),
    );

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("ordena os filmes por título", async () => {
    const user = userEvent.setup();

    await renderWithRouter(
      <WatchlistTable movies={movies} onRemove={vi.fn()} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /título/i,
      }),
    );

    const rows = screen.getAllByRole("row").slice(1);

    expect(within(rows[0]).getByText("Batman Begins")).toBeInTheDocument();

    expect(within(rows[1]).getByText("Dune")).toBeInTheDocument();

    expect(within(rows[2]).getByText("Interstellar")).toBeInTheDocument();
  });

  it("ordena os filmes por nota da maior para a menor", async () => {
    const user = userEvent.setup();

    await renderWithRouter(
      <WatchlistTable movies={movies} onRemove={vi.fn()} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /nota/i,
      }),
    );

    const rows = screen.getAllByRole("row").slice(1);

    expect(within(rows[0]).getByText("8.7")).toBeInTheDocument();

    expect(within(rows[1]).getByText("8.2")).toBeInTheDocument();

    expect(within(rows[2]).getByText("8.0")).toBeInTheDocument();
  });
});
