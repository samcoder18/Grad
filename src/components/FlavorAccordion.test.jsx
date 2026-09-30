import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import FlavorAccordion from "./FlavorAccordion.jsx";

describe("flavor carousel autoplay", () => {
  afterEach(() => vi.useRealTimers());

  it("advances on its own without a page scroll", () => {
    vi.useFakeTimers();
    const { container } = render(<FlavorAccordion />);

    expect(screen.getByText(/Яркий цитрус, насыщенный аромат/)).toBeInTheDocument();
    expect(container.querySelector("#flavors")).not.toHaveStyle({ height: "170dvh" });
    expect(container.querySelector(".sticky")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(4000));

    expect(screen.getByText(/Насыщенный восточный барбарис/)).toBeInTheDocument();
  });
});
