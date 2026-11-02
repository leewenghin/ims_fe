export function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-7 flex min-h-12 flex-wrap items-center justify-between gap-4">
      <h1 className="text-[32px] leading-[44px] font-bold tracking-[-0.11px] text-ink">{title}</h1>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}

export function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" className="h-12 rounded-lg bg-brand px-6 text-sm font-bold text-white hover:bg-brand/90" onClick={onClick}>
      {children}
    </button>
  );
}
