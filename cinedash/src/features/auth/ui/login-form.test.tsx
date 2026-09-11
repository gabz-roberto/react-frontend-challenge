import { beforeEach, describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithRouter } from "@/test/render-with-router";

import { useAuthStore } from "../model/auth.store";

import { LoginForm } from "./login-form";

describe("LoginForm", () => {
  beforeEach(() => {
    localStorage.clear();

    useAuthStore.setState({
      token: null,
      isAuthenticated: false,
    });
  });

  it("exibe erros de validação ao enviar o formulário vazio", async () => {
    const user = userEvent.setup();

    await renderWithRouter(<LoginForm />);

    await user.click(
      screen.getByRole("button", {
        name: /entrar/i,
      }),
    );

    expect(await screen.findByText("E-mail é obrigatório")).toBeInTheDocument();

    expect(
      await screen.findByText("A senha deve ter mais de 6 caracteres"),
    ).toBeInTheDocument();
  });

  it("exibe erro quando o e-mail é inválido", async () => {
    const user = userEvent.setup();

    await renderWithRouter(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "email-invalido");

    await user.type(screen.getByLabelText(/senha/i), "1234567");

    await user.click(
      screen.getByRole("button", {
        name: /entrar/i,
      }),
    );

    expect(
      await screen.findByText("Informe um e-mail válido"),
    ).toBeInTheDocument();

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("autentica o usuário ao enviar credenciais válidas", async () => {
    const user = userEvent.setup();

    await renderWithRouter(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "user@example.com");

    await user.type(screen.getByLabelText(/senha/i), "1234567");

    await user.click(
      screen.getByRole("button", {
        name: /entrar/i,
      }),
    );

    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    expect(useAuthStore.getState().token).not.toBeNull();
  });
});
