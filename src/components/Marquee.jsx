import { Asterisk } from "@phosphor-icons/react";
import { flavors } from "../data/flavors.js";

const items = [...flavors.map((f) => f.name), "Dolce Cola", "Lime", "Orange", "Вода Гудис"];

export default function Marquee() {
  const row = (key, hidden) => (
    <div key={key} aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((name, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span className="px-6 font-display text-lg font-semibold tracking-tight whitespace-nowrap text-white md:text-xl">
            {name}
          </span>
          <Asterisk size={22} weight="bold" className="shrink-0 text-white/70" />
        </span>
      ))}
    </div>
  );

  return (
    <section aria-label="Линейка вкусов" className="relative -my-2 overflow-hidden py-10">
      <div className="-rotate-1">
        <div className="flex w-max animate-marquee bg-brand py-4 will-change-transform">
          {row("a", false)}
          {row("b", true)}
        </div>
      </div>
    </section>
  );
}
