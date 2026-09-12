import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailsSkeleton() {
  return (
    <div className="space-y-10">
      <Skeleton className="h-10 w-28 rounded-sm border-2 border-foreground" />

      <div className="relative overflow-hidden border-2 border-foreground bg-muted shadow-[6px_6px_0_var(--foreground)]">
        <Skeleton className="h-64 w-full rounded-none border-0 sm:h-80 md:h-[420px]" />

        <div className="absolute bottom-4 left-4 flex gap-2 sm:bottom-6 sm:left-6">
          <Skeleton className="h-7 w-16 rounded-none border-2 border-foreground" />
          <Skeleton className="h-7 w-20 rounded-none border-2 border-foreground" />
          <Skeleton className="h-7 w-14 rounded-none border-2 border-foreground" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
        <Skeleton className="aspect-[2/3] w-full rounded-none border-2 border-foreground shadow-[6px_6px_0_var(--foreground)]" />

        <div className="space-y-8">
          <div className="space-y-5 border-b-2 border-foreground pb-8">
            <Skeleton className="h-7 w-32 rounded-none border-2 border-foreground" />

            <div className="space-y-3">
              <Skeleton className="h-12 w-4/5 rounded-sm sm:h-14" />
              <Skeleton className="h-12 w-2/3 rounded-sm sm:h-14" />
            </div>

            <Skeleton className="h-10 w-52 rounded-sm border-2 border-foreground" />

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-20 rounded-none border-2 border-foreground" />
              <Skeleton className="h-8 w-24 rounded-none border-2 border-foreground" />
              <Skeleton className="h-8 w-16 rounded-none border-2 border-foreground" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-2 rounded-none" />
              <Skeleton className="h-8 w-28 rounded-sm" />
            </div>

            <div className="space-y-3 border-2 border-foreground bg-card p-5 shadow-[4px_4px_0_var(--foreground)] sm:p-6">
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-4 w-full rounded-sm" />
              <Skeleton className="h-4 w-11/12 rounded-sm" />
              <Skeleton className="h-4 w-4/5 rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6 border-t-2 border-foreground pt-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded-sm" />
          <Skeleton className="h-9 w-56 rounded-sm" />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-[2/3] w-full rounded-none border-2 border-foreground shadow-[3px_3px_0_var(--foreground)]" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-sm" />
                <Skeleton className="h-3 w-3/4 rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6 border-t-2 border-foreground pt-8">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-sm" />
          <Skeleton className="h-9 w-32 rounded-sm" />
        </div>

        <Skeleton className="aspect-video w-full rounded-none border-2 border-foreground shadow-[6px_6px_0_var(--foreground)]" />
      </section>
    </div>
  );
}
