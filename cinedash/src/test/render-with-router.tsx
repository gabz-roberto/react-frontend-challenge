import type { ReactNode } from "react";

import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

import { act, render } from "@testing-library/react";

interface RenderWithRouterOptions {
  route?: string;
}

export async function renderWithRouter(
  ui: ReactNode,
  options: RenderWithRouterOptions = {},
) {
  const { route = "/" } = options;

  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: () => <>{ui}</>,
  });

  const discoverRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/discover",
    component: () => <div>Discover page</div>,
  });

  const movieRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/movie/$movieId",
    component: () => <div>Movie details</div>,
  });

  const routeTree = rootRoute.addChildren([
    indexRoute,
    discoverRoute,
    movieRoute,
  ]);

  const history = createMemoryHistory({
    initialEntries: [route],
  });

  const router = createRouter({
    routeTree,
    history,
  });

  await act(async () => {
    await router.load();
  });

  return render(<RouterProvider router={router} />);
}
