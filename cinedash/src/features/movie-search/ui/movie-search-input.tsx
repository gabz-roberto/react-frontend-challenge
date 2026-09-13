import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface MovieSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function MovieSearchInput({ value, onChange }: MovieSearchInputProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute left-2 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center border-2 border-foreground bg-secondary text-secondary-foreground shadow-[2px_2px_0_var(--foreground)]">
        <Search className="size-4 stroke-[2.5]" />
      </div>

      <Input
        type="search"
        placeholder="Buscar filmes..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 pl-12 pr-4 text-base font-semibold"
        aria-label="Buscar filmes"
      />
    </div>
  );
}
