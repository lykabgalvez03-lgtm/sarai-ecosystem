import SaraiPortal from "./components/sarai-portal";

export interface DocumentData {
  id: string;
  title: string;
  origin: string;
  status: "DRAFT" | "PENDING REVIEW" | "APPROVED" | "ARCHIVED";
}

export default function Home() {
  return <SaraiPortal />;
}