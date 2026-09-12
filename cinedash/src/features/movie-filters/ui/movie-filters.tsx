import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Genre } from "@/entities/genre/model/genre.types";
import type { MovieFilters as MovieFiltersState } from "../model/movie-filters.types";

interface MovieFiltersProps {
  filters: MovieFiltersState;
  genres: Genre[];
  onGenreChange: (genre?: number) => void;
  onYearChange: (year?: number) => void;
  onRatingChange: (rating?: number) => void;
  onClear: () => void;
}

const currentYear = new Date().getFullYear();

const years = Array.from({ length: 30 }, (_, index) => currentYear - index);

const ratings = [5, 6, 7, 8, 9];

export function MovieFilters({
  filters,
  genres,
  onGenreChange,
  onYearChange,
  onRatingChange,
  onClear,
}: MovieFiltersProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
      <Select
        value={filters.genre?.toString() ?? "all"}
        onValueChange={(value) =>
          onGenreChange(value === "all" ? undefined : Number(value))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Gênero">
            {filters.genre
              ? genres.find((genre) => genre.id === filters.genre)?.name
              : "Gênero"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos os gêneros</SelectItem>

          {genres.map((genre) => (
            <SelectItem key={genre.id} value={String(genre.id)}>
              {genre.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.year?.toString() ?? "all"}
        onValueChange={(value) =>
          onYearChange(value === "all" ? undefined : Number(value))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Ano">
            {filters.year ? String(filters.year) : "Ano"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos os anos</SelectItem>

          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.minRating?.toString() ?? "all"}
        onValueChange={(value) =>
          onRatingChange(value === "all" ? undefined : Number(value))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Nota mínima">
            {filters.minRating !== undefined
              ? `${filters.minRating}+`
              : "Nota mínima"}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Qualquer nota</SelectItem>

          {ratings.map((rating) => (
            <SelectItem key={rating} value={String(rating)}>
              {rating}+
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="secondary"
        onClick={onClear}
        className="w-full lg:w-auto"
      >
        Limpar filtros
      </Button>
    </div>
  );
}
