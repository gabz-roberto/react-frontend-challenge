import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MoviePaginationProps {
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export function MoviePagination({
  page,
  totalPages,
  disabled = false,
  onPageChange,
}: MoviePaginationProps) {
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 pt-4">
      <Button
        type="button"
        variant="outline"
        disabled={!hasPreviousPage || disabled}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="size-4" />
        Anterior
      </Button>

      <span className="min-w-32 text-center text-sm text-muted-foreground">
        Página {page} de {totalPages}
      </span>

      <Button
        type="button"
        variant="outline"
        disabled={!hasNextPage || disabled}
        onClick={() => onPageChange(page + 1)}
      >
        Próxima
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
