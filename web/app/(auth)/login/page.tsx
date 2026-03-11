export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">
          Login
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Authentication screen placeholder
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Supabase auth plumbing and route protection are ready. The next step
          is adding a real sign-in form that calls `supabase.auth.signInWithPassword`.
        </p>
      </div>
    </div>
  );
}
