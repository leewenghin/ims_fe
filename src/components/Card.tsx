import { Icon } from "@/src/components/Icon";

export function Card({ title, action, children, className = "" }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[14px] bg-surface p-8 shadow-card dark:border dark:border-line ${className}`}>
      {title && (
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-ink">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function MonthPicker({ label = "October" }: { label?: string }) {
  return (
    <button type="button" className="flex h-7 w-[104px] items-center justify-between rounded border border-line bg-head px-3 text-xs font-semibold text-faint">
      {label}
      <Icon name="chevronDown" size={12} strokeWidth={2.5} />
    </button>
  );
}
