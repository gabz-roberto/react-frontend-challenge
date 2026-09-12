import { Skeleton } from "@/components/ui/skeleton";

export function MovieCardSkeleton() {
  return (
    <div
      className="
        overflow-hidden
        rounded-md
        border-2
        border-foreground
        bg-card
        shadow-[5px_5px_0_var(--foreground)]
      "
    >
      <div className="relative aspect-[2/3] overflow-hidden border-b-2 border-foreground bg-muted">
        <Skeleton className="h-full w-full rounded-none" />

        <Skeleton className="absolute left-3 top-3 h-7 w-12 rounded-none border-2 border-foreground" />

        <Skeleton className="absolute right-3 top-3 h-7 w-14 rounded-none border-2 border-foreground" />
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-4/5 rounded-sm" />
          <Skeleton className="h-5 w-3/5 rounded-sm" />
        </div>

        <Skeleton className="h-1.5 w-12 rounded-none" />
      </div>
    </div>
  );
}
