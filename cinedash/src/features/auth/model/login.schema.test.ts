import { describe, expect, it } from "vitest";

import { loginSchema } from "./login.schema";

describe("loginSchema", () => {
  it("aceita credenciais válidas", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "1234567",
    });

    expect(result.success).toBe(true);
  });

  it("rejeita e-mail inválido", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "1234567",
    });

    expect(result.success).toBe(false);
  });

  it("rejeita senha com 6 caracteres", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "123456",
    });

    expect(result.success).toBe(false);
  });

  it("rejeita campos vazios", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "",
    });

    expect(result.success).toBe(false);
  });
});