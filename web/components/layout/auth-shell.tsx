import { Logo } from "@/components/shared/logo";

export function AuthShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_45%),linear-gradient(180deg,_#f8fafc_0%,_#ecfeff_100%)] px-6 py-10">
      <div className="flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl space-y-4">
          <Logo dark />
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
            Clean starting point for authentication and protected app routes.
          </h1>
          <p className="text-base leading-7 text-slate-600">
            Keep public auth screens in the auth group and move protected pages
            into the app group so route ownership stays easy to understand.
          </p>
        </div>
        {children}
      </div>
    </main>
  );
}
