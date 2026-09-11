import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[320px] w-full rounded-xl md:h-[420px]" />

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <Skeleton className="aspect-[2/3] w-full rounded-xl" />

        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/3" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
