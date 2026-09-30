import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App.jsx";

describe("application smoke test", () => {
  it("renders the main product sections", () => {
    window.location.hash = "";
    render(<App />);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Стеклянная линейка/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /2,6 млн бутылок/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /вода Центрального Кавказа/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /вкусовые основы esarom/i }),
    ).toBeInTheDocument();
  });

  it("places the esarom producer block before the FAQ", () => {
    window.location.hash = "";
    render(<App />);

    const producer = document.querySelector("#esarom");
    const faq = document.querySelector("#faq");

    expect(
      producer.compareDocumentPosition(faq) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("shows the supplied hero loop and production photography with useful descriptions", () => {
    window.location.hash = "";
    render(<App />);

    const heroLoops = document.querySelectorAll(
      'video[aria-label="Бутылки напитков «Виноград» и «Апельсин» на горном лугу"]',
    );
    expect(heroLoops).toHaveLength(2);
    heroLoops.forEach((video) => {
      expect(video).toHaveProperty("autoplay", true);
      expect(video).toHaveProperty("loop", true);
      expect(video).toHaveProperty("muted", true);
      expect(video).toHaveProperty("playsInline", true);
    });
    expect(
      screen.getByRole("img", {
        name: "Контроль качества напитков на линии розлива",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Готовая продукция на складе" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Упаковочная линия на производстве" }),
    ).toBeInTheDocument();
  });

  it("introduces each production photo with its caption", () => {
    window.location.hash = "";
    render(<App />);

    for (const label of ["Контроль качества", "Склад", "Производство"]) {
      const caption = screen.getByText(label, { selector: "figcaption" });
      const image = caption.closest("figure").querySelector("img");

      expect(
        caption.compareDocumentPosition(image) & Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });
});
