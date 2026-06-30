import Link from "next/link";
import SiteShell from "../components/site-shell";

const attendanceHighlights = [
  { label: "Daily attendance", value: "Fast and simple check-in" },
  { label: "Field coordination", value: "Support staff in the field" },
  { label: "Operational readiness", value: "Reliable records for planning" },
];

export default function AttendancePage() {
  return (
    <SiteShell title="Attendance" description="A practical attendance module for managing team presence and daily operations.">
      <div className="rounded-4xl border border-emerald-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Attendance</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Track presence, stay informed</h2>
          </div>
          <Link href="/login" className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
            View for staff
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {attendanceHighlights.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">{item.label}</p>
              <p className="mt-2 text-sm text-slate-600">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
