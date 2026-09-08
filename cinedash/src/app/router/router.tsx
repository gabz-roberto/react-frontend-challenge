import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
} from "@tanstack/react-router";

import { RootLayout } from "./root-layout";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Navigate to="/login" />,
});

// const loginRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/login",
//   component: () => <div>Login</div>,
// });

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: () => (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        background: "red",
        color: "white",
        padding: "40px",
        fontSize: "40px",
      }}
    >
      TESTE LOGIN
    </div>
  ),
});

const discoverRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/discover",
  component: () => <div>Discover</div>,
});

const watchlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watchlist",
  component: () => <div>Watchlist</div>,
});

const movieDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/$movieId",
  component: () => <div>Movie Details</div>,
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