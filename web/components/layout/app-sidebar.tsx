import Link from "next/link";

import { appNavigation } from "@/lib/constants/navigation";
import { Logo } from "@/components/shared/logo";

export function AppSidebar() {
  return (
    <aside className="w-full rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-slate-50 lg:max-w-xs">
      <div className="flex items-center justify-between lg:block">
        <Logo />
        <p className="hidden text-xs uppercase tracking-[0.24em] text-slate-400 lg:block">
          Navigation
        </p>
      </div>

      <nav className="mt-6 grid gap-2">
        {appNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <span className="block">{item.label}</span>
            <span className="mt-1 block text-xs text-slate-500">
              {item.description}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
