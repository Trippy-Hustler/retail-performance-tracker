import { cn } from "@/lib/utils/cn";

type LogoProps = {
  dark?: boolean;
};

export function Logo({ dark = false }: LogoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-sm font-semibold text-white">
          RT
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-semibold uppercase tracking-[0.24em]",
              dark ? "text-teal-700" : "text-slate-400",
            )}
          >
            Retail Ops
          </p>
          <p className={dark ? "text-slate-950" : "text-white"}>
            Performance Tracker
          </p>
        </div>
      </div>
    </div>
  );
}
