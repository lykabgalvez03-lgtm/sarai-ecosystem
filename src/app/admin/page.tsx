import Link from "next/link";
import SiteShell from "../components/site-shell";

const adminCards = [
  { title: "Document Workflow", note: "Review incoming DTS records and approve requests." },
  { title: "Attendance Oversight", note: "Monitor staff presence and attendance summaries." },
  { title: "News & Trophies", note: "Publish achievements, announcements, and updates." },
];

export default function AdminPage() {
  return (
    <SiteShell title="Admin Interface" description="A secure admin space for managing content, attendance, and operations inside the SARAI ecosystem.">
      <div className="rounded-4xl border border-emerald-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Special access</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Admin workspace</h2>
          </div>
          <Link href="/" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
            Back to public home
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {adminCards.map((card) => (
            <div key={card.title} className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.note}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
