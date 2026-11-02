import { Icon } from "@/src/components/Icon";

const pad = (value: number) => String(value).padStart(2, "0");

export function Pagination({
  from,
  to,
  total,
  onPrev,
  onNext,
}: {
  from: number;
  to: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <div className="mt-5 flex items-center justify-between">
      <p className="text-sm font-semibold text-muted">
        Showing {total === 0 ? 0 : from}-{pad(to)} of {total}
      </p>
      <div className="flex h-[31px] overflow-hidden rounded-xl border border-line bg-head">
        <button type="button" aria-label="Previous page" disabled={!onPrev} className="flex w-[43px] items-center justify-center text-ink disabled:opacity-40" onClick={onPrev}>
          <Icon name="chevronLeft" size={16} strokeWidth={2.5} />
        </button>
        <button type="button" aria-label="Next page" disabled={!onNext} className="flex w-[43px] items-center justify-center border-l border-line text-ink disabled:opacity-40" onClick={onNext}>
          <Icon name="chevronRight" size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
