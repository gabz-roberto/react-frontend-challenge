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
    <div className="flex flex-col items-stretch justify-center gap-4 pt-6 sm:flex-row sm:items-center">
      <Button
        type="button"
        variant="outline"
        disabled={!hasPreviousPage || disabled}
        onClick={() => onPageChange(page - 1)}
        className="w-full sm:w-auto"
      >
        <ChevronLeft className="size-4 stroke-[3]" />
        Anterior
      </Button>

      <div className="flex min-w-36 items-center justify-center border-2 border-foreground bg-card px-4 py-2 text-center shadow-[3px_3px_0_var(--foreground)]">
        <span className="text-xs font-black uppercase tracking-[0.08em]">
          Página {page} de {totalPages}
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={!hasNextPage || disabled}
        onClick={() => onPageChange(page + 1)}
        className="w-full sm:w-auto"
      >
        Próxima
        <ChevronRight className="size-4 stroke-[3]" />
      </Button>
    </div>
  );
}
