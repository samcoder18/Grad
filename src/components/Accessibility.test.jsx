import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LocationMap } from "./ui/expand-map.jsx";

describe("keyboard-accessible controls", () => {
  it("expands the named map button with the keyboard", async () => {
    const user = userEvent.setup();
    render(<LocationMap location="Тестовый адрес" />);

    const mapControl = screen.getByRole("button", {
      name: "Развернуть карту: Тестовый адрес",
    });
    expect(mapControl).toHaveAttribute("aria-expanded", "false");

    mapControl.focus();
    await user.keyboard("{Enter}");
    expect(mapControl).toHaveAttribute("aria-expanded", "true");
    expect(mapControl).toHaveAccessibleName("Свернуть карту: Тестовый адрес");
  });
});
