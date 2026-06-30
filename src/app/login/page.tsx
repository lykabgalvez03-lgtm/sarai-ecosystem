import Link from "next/link";
import SiteShell from "../components/site-shell";

export default function LoginPage() {
  return (
    <SiteShell title="Customer Access" description="Sign in to access your dashboard, request services, and stay connected with the SARAI ecosystem.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-4xl border border-emerald-100 bg-white p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Secure sign in</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Welcome back to the SARAI workplace</h2>
          <p className="mt-3 max-w-xl text-slate-600">
            Use your customer credentials to view transaction updates, track attendance, and browse announcements in one portal.
          </p>

          <div className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Email address
              <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-emerald-500" placeholder="name@dost1.ph" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Password
              <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 focus:border-emerald-500" placeholder="••••••••" />
            </label>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                Remember me
              </label>
              <Link href="/admin" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                Sign in as admin
              </Link>
            </div>
            <Link href="/dts" className="flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700">
              Continue to portal
            </Link>
          </div>
        </section>

        <aside className="rounded-4xl border border-emerald-100 bg-emerald-50/70 p-7 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">What you can access</p>
          <ul className="mt-5 space-y-3 text-sm text-slate-700">
            <li className="rounded-2xl border border-white bg-white/60 p-3">File transactions and document status updates</li>
            <li className="rounded-2xl border border-white bg-white/60 p-3">Attendance and personnel monitoring</li>
            <li className="rounded-2xl border border-white bg-white/60 p-3">Program achievements and announcements</li>
          </ul>
        </aside>
      </div>
    </SiteShell>
  );
}
