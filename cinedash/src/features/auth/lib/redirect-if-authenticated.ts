import { redirect } from "@tanstack/react-router";

import { useAuthStore } from "../model/auth.store";

export function redirectIfAuthenticated() {
  const { isAuthenticated } = useAuthStore.getState();

  if (isAuthenticated) {
    throw redirect({
      to: "/discover",
    });
  }
}
