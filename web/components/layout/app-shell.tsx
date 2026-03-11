import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";

export function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6">
        <AppSidebar />
        <div className="flex min-h-[calc(100vh-2rem)] flex-1 flex-col rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <AppHeader />
          <main className="flex-1 p-5 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
