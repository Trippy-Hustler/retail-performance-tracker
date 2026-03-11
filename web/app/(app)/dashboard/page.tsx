import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

const summaryCards = [
  {
    title: "Weekly Target",
    value: "--",
  },
  {
    title: "Achieved Sales",
    value: "--",
  },
  {
    title: "Achievement %",
    value: "--",
  },
  {
    title: "Stores Covered",
    value: "--",
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
          </article>
        ))}
      </div>
    </section>
  );
}
