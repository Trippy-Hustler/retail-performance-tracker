import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type WeeklyTargetRow = {
  target_quantity: number | null;
  store_id: string;
  stores: {
    store_name: string;
  } | null;
};

type DailySalesRow = {
  quantity_sold: number | null;
  store_id: string;
};

function getCurrentWeekRange() {
  const today = new Date();
  const day = today.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() + diffToMonday);
  weekStart.setHours(0, 0, 0, 0);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const formatDate = (value: Date) => value.toISOString().slice(0, 10);

  return {
    weekStart: formatDate(weekStart),
    weekEnd: formatDate(weekEnd),
  };
}

export default async function ReportsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { weekStart, weekEnd } = getCurrentWeekRange();

  const { data: weeklyTargets, error: weeklyTargetsError } = await supabase
    .from("weekly_targets")
    .select("store_id, target_quantity, stores(store_name)")
    .eq("week_start_date", weekStart);

  const { data: dailySales, error: dailySalesError } = await supabase
    .from("daily_sales")
    .select("store_id, quantity_sold")
    .gte("sale_date", weekStart)
    .lte("sale_date", weekEnd);

  const hasQueryError = Boolean(weeklyTargetsError || dailySalesError);

  const summaryMap = new Map<
    string,
    {
      storeName: string;
      targetQty: number;
      achievedQty: number;
    }
  >();

  for (const row of (weeklyTargets ?? []) as WeeklyTargetRow[]) {
    const existing = summaryMap.get(row.store_id);

    summaryMap.set(row.store_id, {
      storeName: row.stores?.store_name ?? existing?.storeName ?? "Unknown Store",
      targetQty: (existing?.targetQty ?? 0) + Number(row.target_quantity ?? 0),
      achievedQty: existing?.achievedQty ?? 0,
    });
  }

  for (const row of (dailySales ?? []) as DailySalesRow[]) {
    const existing = summaryMap.get(row.store_id);

    summaryMap.set(row.store_id, {
      storeName: existing?.storeName ?? "Unknown Store",
      targetQty: existing?.targetQty ?? 0,
      achievedQty: (existing?.achievedQty ?? 0) + Number(row.quantity_sold ?? 0),
    });
  }

  const storeSummaries = Array.from(summaryMap.values())
    .map((store) => ({
      ...store,
      achievementPercent:
        store.targetQty > 0
          ? ((store.achievedQty / store.targetQty) * 100).toFixed(1)
          : "0.0",
    }))
    .sort((first, second) => second.achievedQty - first.achievedQty);

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
          Reports
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Store-wise weekly summary
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          This table loads the current week&apos;s target and achieved quantity
          from Supabase and groups the result by store.
        </p>
        <p className="text-sm text-slate-500">
          Week: {weekStart} to {weekEnd}
        </p>
        {hasQueryError ? (
          <p className="max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            The report could not be loaded. Check that `weekly_targets` and
            `daily_sales` exist and that your user can read both tables.
          </p>
        ) : null}
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
          <h3 className="text-xl font-semibold text-slate-950">
            Weekly store summary
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  Store name
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  Target qty
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  Achieved qty
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:px-6">
                  Achievement %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {storeSummaries.length > 0 ? (
                storeSummaries.map((store) => (
                  <tr key={store.storeName}>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-950 sm:px-6">
                      {store.storeName}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 sm:px-6">
                      {store.targetQty}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 sm:px-6">
                      {store.achievedQty}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-teal-700 sm:px-6">
                      {store.achievementPercent}%
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-8 text-center text-sm text-slate-500 sm:px-6"
                  >
                    No weekly report data found for this week.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
