import { Icon } from "@/src/components/Icon";

export function Table({ head, children, empty = "No rows." }: { head: string[]; children: React.ReactNode; empty?: string }) {
  const hasRows = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <div className="overflow-x-auto rounded-[14px] border border-line bg-surface shadow-card">
      <table className="w-full text-left">
        <thead className="bg-head">
          <tr className="h-12">
            {head.map((label, index) => (
              <th key={label || index} className="px-8 text-sm font-extrabold whitespace-nowrap text-ink uppercase">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hasRows ? (
            children
          ) : (
            <tr className="h-[74px] border-t border-divider">
              <td colSpan={head.length} className="px-8 text-sm font-semibold text-muted">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <tr className="h-[74px] border-t border-divider">{children}</tr>;
}

export function Cell({ children, mono = false, className = "" }: { children: React.ReactNode; mono?: boolean; className?: string }) {
  return <td className={`px-8 text-sm font-semibold whitespace-nowrap text-ink ${mono ? "font-mono text-[13px]" : ""} ${className}`}>{children}</td>;
}

export function RowActions({ onEdit, onDelete, deleteLabel = "Delete" }: { onEdit: () => void; onDelete?: () => void; deleteLabel?: string }) {
  return (
    <div className="flex h-8 w-fit overflow-hidden rounded-lg border border-line bg-head">
      <button type="button" aria-label="Edit" className="flex w-12 items-center justify-center text-ink hover:bg-field" onClick={onEdit}>
        <Icon name="edit" size={16} />
      </button>
      {onDelete && (
        <button type="button" aria-label={deleteLabel} title={deleteLabel} className="flex w-12 items-center justify-center border-l border-line text-danger hover:bg-field" onClick={onDelete}>
          <Icon name="trash" size={16} />
        </button>
      )}
    </div>
  );
}
