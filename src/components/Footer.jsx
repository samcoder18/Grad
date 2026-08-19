import { contacts } from "../data/flavors.js";
import { asset } from "../lib/asset.js";

const links = [
  { href: "#flavors", label: "Вкусы" },
  { href: "#hits", label: "Хиты" },
  { href: "#gudis", label: "Гудис" },
  { href: "#about", label: "О компании" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#top" className="inline-block">
            <img
              src={asset("img/logo-black.webp")}
              alt="Сладкий Град"
              className="h-14 w-auto"
            />
          </a>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Натуральные лимонады и вода Гудис от производителя. Жизнь без преград,
            вода с вершин Кавказа.
          </p>
        </div>

        <nav aria-label="Нижняя навигация">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <a
            href={contacts.phoneHref}
            className="font-semibold text-ink transition-colors hover:text-brand"
          >
            {contacts.phone}
          </a>
          <a
            href={`mailto:${contacts.email}`}
            className="text-ink-soft transition-colors hover:text-ink"
          >
            {contacts.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 Сладкий Град</span>
          <span>Производство и оптовые поставки напитков</span>
        </div>
      </div>
    </footer>
  );
}
