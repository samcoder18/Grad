import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Bell } from "@phosphor-icons/react";
import { MODULE_GROUPS, MODULES } from "./modules.js";
import { Avatar } from "./ui.jsx";

const ease = [0.16, 1, 0.3, 1];

export default function OfficeShell({ onExit }) {
  const [activeId, setActiveId] = useState("leadership");
  const reduce = useReducedMotion();
  const active = MODULES.find((m) => m.id === activeId);
  const ActiveComponent = active.component;
  const activeGroup = MODULE_GROUPS.find((g) => g.id === active.group);

  // Content scrolls with the window: return to top on module switch.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeId]);

  return (
    <div className="flex min-h-screen bg-paper">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col bg-ink text-white md:flex">
        <div className="flex items-center gap-3 px-6 pb-6 pt-7">
          <img
            src="/img/logo-white.webp"
            alt="Сладкий Град"
            className="h-10 w-auto"
          />
          <div className="text-xs text-white/50">Виртуальный офис</div>
        </div>

        <nav aria-label="Модули офиса" className="flex-1 space-y-6 overflow-y-auto px-4 pb-4">
          {MODULE_GROUPS.map((group) => (
            <div key={group.id}>
              <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                {group.title}
              </div>
              <ul className="space-y-1">
                {MODULES.filter((m) => m.group === group.id).map((m) => {
                  const Icon = m.icon;
                  const isActive = m.id === activeId;
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(m.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-brand text-white"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon size={18} weight={isActive ? "fill" : "regular"} aria-hidden="true" />
                        {m.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={onExit}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            На сайт
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-paper/80 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              aria-label="Вернуться на сайт"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink md:hidden"
            >
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <div className="min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                {activeGroup.title}
              </div>
              <h1 className="truncate font-display text-lg font-bold text-ink">
                {active.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Уведомления"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
            >
              <Bell size={18} aria-hidden="true" />
              <span aria-hidden="true" className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand" />
            </button>
            <div className="flex items-center gap-2.5">
              <Avatar name="Вы Менеджер" className="h-10 w-10 text-xs" />
              <div className="hidden text-sm sm:block">
                <div className="font-semibold leading-tight text-ink">Вы</div>
                <div className="text-xs text-ink-soft">менеджер</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 py-6 pb-24 md:px-8 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease }}
            >
              <ActiveComponent {...(active.props ?? {})} />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom nav (mobile) */}
        <nav aria-label="Модули офиса" className="fixed inset-x-0 bottom-0 z-20 flex gap-1 overflow-x-auto border-t border-white/10 bg-ink px-2 py-2 md:hidden">
          {MODULES.map((m) => {
            const Icon = m.icon;
            const isActive = m.id === activeId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveId(m.id)}
                aria-label={m.title}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-w-[64px] shrink-0 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-colors ${
                  isActive ? "bg-brand text-white" : "text-white/60"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="max-w-[72px] truncate">{m.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
