export function AppHeader() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Internal App
        </p>
        <h1 className="text-lg font-semibold text-slate-950">
          Retail Performance Tracker
        </h1>
      </div>
      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
        Role-aware data view goes here
      </div>
    </header>
  );
}
