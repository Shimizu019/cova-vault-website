import { FlaskConical } from 'lucide-react';

/**
 * Unobtrusive safety banner shown at the top of the `/demo` page.
 */
function DemoBanner() {
  return (
    <div
      role="note"
      aria-label="Demo safety information"
      className="flex flex-col gap-3 rounded-card border border-cova-warning/40 bg-cova-warning/10 px-5 py-4 sm:flex-row sm:items-start sm:gap-4"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-btn bg-cova-warning/15 text-cova-warning" aria-hidden="true">
        <FlaskConical className="h-[18px] w-[18px]" />
      </span>
      <div className="text-sm leading-relaxed text-cova-text">
        <p className="font-semibold">Interactive preview — not the real app.</p>
        <p className="mt-1 text-cova-muted">
          Every record below is fictional sample data. Never enter real passwords or sensitive
          information here. Demo interactions are temporary: they reset when you use Reset Demo
          or refresh this page. Nothing is saved or sent anywhere.
        </p>
      </div>
    </div>
  );
}

export default DemoBanner;
