import { Phone, EnvelopeSimple } from "@phosphor-icons/react";
import { contacts } from "../data/flavors.js";
import { asset } from "../lib/asset.js";

const links = [
  { href: "#flavors", label: "Вкусы" },
  { href: "#hits", label: "Хиты" },
  { href: "#gudis", label: "Гудис" },
  { href: "#about", label: "О компании" },
  { href: "#contacts", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer className="bg-ink p-4 sm:p-6">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-white px-6 py-10 md:px-12 md:py-14">
        {/* Top row: logo + contact buttons */}
        <div className="flex items-center justify-between gap-6">
          <a href="#top" className="inline-flex items-center gap-3">
            <img
              src={asset("img/logo-black.webp")}
              alt="Сладкий Град"
              className="h-12 w-auto"
            />
          </a>

          <div className="flex items-center gap-3">
            <a
              href={contacts.phoneHref}
              aria-label={`Позвонить: ${contacts.phone}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors duration-300 hover:bg-ink/10"
            >
              <Phone size={20} weight="bold" />
            </a>
            <a
              href={`mailto:${contacts.email}`}
              aria-label={`Написать: ${contacts.email}`}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors duration-300 hover:bg-ink/10"
            >
              <EnvelopeSimple size={20} weight="bold" />
            </a>
          </div>
        </div>

        <div className="my-8 border-t border-line md:my-10" />

        {/* Bottom row: copyright + nav */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-ink">© 2026 Сладкий Град</p>
            <p className="mt-1 text-ink-soft">
              Производство и оптовые поставки напитков
            </p>
          </div>

          <nav aria-label="Нижняя навигация" className="md:text-right">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm font-medium text-ink transition-colors hover:text-brand"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-x-7 gap-y-2 text-sm text-ink-soft md:justify-end">
              <a
                href={contacts.phoneHref}
                className="transition-colors hover:text-ink"
              >
                {contacts.phone}
              </a>
              <a
                href={`mailto:${contacts.email}`}
                className="transition-colors hover:text-ink"
              >
                {contacts.email}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
