"use client";

import { Icon } from "@/src/components/Icon";

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#202224]/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-[900px] rounded-[14px] border border-line bg-surface px-[60px] pt-10 pb-[60px] shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-[34px] flex items-center justify-between">
          <h2 className="text-2xl font-bold text-ink">{title}</h2>
          <button type="button" aria-label="Close" className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-line text-muted hover:text-ink" onClick={onClose}>
            <Icon name="close" size={14} strokeWidth={2.5} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ModalActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-[46px] flex flex-wrap justify-center gap-4">{children}</div>;
}
