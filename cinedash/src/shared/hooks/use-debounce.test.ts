import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("retorna o valor inicial imediatamente", () => {
    const { result } = renderHook(() => useDebounce("Batman", 500));

    expect(result.current).toBe("Batman");
  });

  it("não atualiza o valor antes do tempo definido", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: "Batman",
        },
      },
    );

    rerender({
      value: "Superman",
    });

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe("Batman");
  });

  it("atualiza o valor depois do tempo definido", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: "Batman",
        },
      },
    );

    rerender({
      value: "Superman",
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("Superman");
  });

  it("reinicia o timer quando o valor muda novamente", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: {
          value: "Batman",
        },
      },
    );

    rerender({
      value: "Superman",
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({
      value: "Interstellar",
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("Batman");

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe("Interstellar");
  });
});
