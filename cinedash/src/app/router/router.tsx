import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Navigate,
} from "@tanstack/react-router";

import { z } from "zod";

import { RootLayout } from "./root-layout";
import { RouterError } from "./router-error";
import { NotFoundPage } from "./not-found-page";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { redirectIfAuthenticated } from "@/features/auth/lib/redirect-if-authenticated";

const rootRoute = createRootRoute({
  component: RootLayout,
  errorComponent: ({ error, reset }) => (
    <RouterError error={error} reset={reset} />
  ),
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/login" />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  beforeLoad: redirectIfAuthenticated,
  component: lazyRouteComponent(
    () => import("@/pages/login/ui/login-page"),
    "LoginPage",
  ),
});

const discoverSearchSchema = z.object({
  genre: z.coerce.number().optional(),
  year: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
  page: z.coerce.number().int().positive().optional(),
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  validateSearch: discoverSearchSchema,
  beforeLoad: requireAuth,
  component: lazyRouteComponent(
    () => import("@/pages/discover/ui/discover-page"),
    "DiscoverPage",
  ),
});

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  beforeLoad: requireAuth,
  component: lazyRouteComponent(
    () => import("@/pages/watchlist/ui/watchlist-page"),
    "WatchlistPage",
  ),
});

const movieDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/$movieId",
  beforeLoad: requireAuth,
  component: lazyRouteComponent(
    () => import("@/pages/movie-details/ui/movie-details-page"),
    "MovieDetailsPage",
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  discoverRoute,
  watchlistRoute,
  movieDetailsRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
