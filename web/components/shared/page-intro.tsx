type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({
  eyebrow,
  title,
  description,
}: PageIntroProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {["Feature area", "Data contract", "UI components"].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Next step
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{item}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Keep page-specific logic inside this route and reuse shared parts
              from `components` and `lib`.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
