import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const topStores = [
  {
    rank: 1,
    storeName: "Indiranagar",
    state: "Karnataka",
    achievement: "92%",
  },
  {
    rank: 2,
    storeName: "Banjara Hills",
    state: "Telangana",
    achievement: "89%",
  },
  {
    rank: 3,
    storeName: "T. Nagar",
    state: "Tamil Nadu",
    achievement: "86%",
  },
  {
    rank: 4,
    storeName: "Connaught Place",
    state: "Delhi",
    achievement: "83%",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { count: totalStores, error: totalStoresError } = await supabase
    .from("stores")
    .select("*", { count: "exact", head: true });

  const summaryCards = [
    {
      title: "Weekly Target",
      value: "12,500",
      description: "Planned units for the current week",
    },
    {
      title: "Achieved Sales",
      value: "9,840",
      description: "Units sold so far this week",
    },
    {
      title: "Achievement %",
      value: "78.7%",
      description: "Current progress against target",
    },
    {
      title: "Stores Covered",
      value: totalStoresError ? "--" : String(totalStores ?? 0),
      description: totalStoresError
        ? "Could not load the live store count from Supabase"
        : "Live count loaded from the stores table",
    },
  ];

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
          Dashboard
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Retail performance overview
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          This page is protected. Only signed-in users can see it.
        </p>
        {totalStoresError ? (
          <p className="max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            The dashboard loaded, but the total stores metric could not be
            fetched from Supabase. Check that the `stores` table exists and
            that your logged-in user can read it.
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-sm font-medium text-slate-500">{card.title}</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h3 className="text-xl font-semibold text-slate-950">Top stores</h3>
          <p className="mt-1 text-sm text-slate-600">
            Placeholder ranking data for the dashboard table section.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  Rank
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  Store
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  State
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  Achievement
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {topStores.map((store) => (
                <tr key={store.rank}>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700 sm:px-6">
                    #{store.rank}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-950 sm:px-6">
                    {store.storeName}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 sm:px-6">
                    {store.state}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-teal-700 sm:px-6">
                    {store.achievement}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
