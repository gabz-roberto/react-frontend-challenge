import { MovieCardSkeleton } from "@/entities/movie/ui/movie-card-skeleton";

const SKELETON_ITEMS = 10;

export function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8 xl:grid-cols-5">
      {Array.from({ length: SKELETON_ITEMS }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}
