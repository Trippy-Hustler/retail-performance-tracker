import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(29,78,216,0.08),_transparent_45%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            Retail Performance Tracker
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950">
            Project scaffold for an internal retail reporting app.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            The app structure is ready for auth, dashboard, reports, rankings,
            and incentives. Pages are placeholders on purpose so features can
            be added cleanly in the next step.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/login"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-900 transition hover:border-sky-300 hover:bg-sky-50"
          >
            Open login route
          </Link>
          <Link
            href="/dashboard"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-900 transition hover:border-sky-300 hover:bg-sky-50"
          >
            Open app shell route
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            "/dashboard",
            "/reports",
            "/rankings",
            "/incentives",
          ].map((route) => (
            <div
              key={route}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Route
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {route}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
