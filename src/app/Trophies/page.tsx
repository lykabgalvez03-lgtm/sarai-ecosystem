import Link from "next/link";
import SiteShell from "../components/site-shell";

const highlights = [
  { title: "Achievements", detail: "Showcase program milestones and recognition for the SARAI team." },
  { title: "Essential news", detail: "Share updates on programs, field activities, and announcements." },
  { title: "Community stories", detail: "Highlight partnerships and regional impact in a simple feed." },
];

export default function TrophiesPage() {
  return (
    <SiteShell title="Trophies & News" description="A dedicated space for achievements, important notices, and news that keeps the public informed.">
      <div className="rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Achievements & announcements</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Strong stories, easy to discover</h2>
          </div>
          <Link href="/" className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            Back home
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
