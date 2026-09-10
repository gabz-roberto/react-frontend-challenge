import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
} from "@tanstack/react-router";

import { z } from "zod";

import { RootLayout } from "./root-layout";

import { LoginPage } from "@/pages/login/ui/login-page";
import { DiscoverPage } from "@/pages/discover/ui/discover-page";
import { WatchlistPage } from "@/pages/watchlist/ui/watchlist-page";
import { MovieDetailsPage } from "@/pages/movie-details/ui/movie-details-page";

import { requireAuth } from "@/features/auth/lib/require-auth";
import { redirectIfAuthenticated } from "@/features/auth/lib/redirect-if-authenticated";

const rootRoute = createRootRoute({
  component: RootLayout,
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
  component: LoginPage,
});

const discoverSearchSchema = z.object({
  genre: z.coerce.number().optional(),
  year: z.coerce.number().optional(),
  rating: z.coerce.number().optional(),
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  validateSearch: discoverSearchSchema,
  beforeLoad: requireAuth,
  component: DiscoverPage,
});

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  beforeLoad: requireAuth,
  component: WatchlistPage,
});

const movieDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/$movieId",
  beforeLoad: requireAuth,
  component: MovieDetailsPage,
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
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
