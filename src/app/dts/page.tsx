import Link from "next/link";
import SiteShell from "../components/site-shell";

const dtsItems = [
  { title: "Document Tracking", detail: "Monitor the lifecycle of all SARAI communications and requests." },
  { title: "Secure Routing", detail: "Send files through a guided workflow with approval status." },
  { title: "Audit Trail", detail: "Keep a clear history of updates and document movement." },
];

export default function DtsPage() {
  return (
    <SiteShell title="DTS" description="A digital document tracking system for the SARAI team to manage files, approvals, and status updates.">
      <div className="rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">Document tracking system</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Keep every transaction organized</h2>
          </div>
          <Link href="/login" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
            Sign in to continue
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {dtsItems.map((item) => (
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
