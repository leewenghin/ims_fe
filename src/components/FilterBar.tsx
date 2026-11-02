"use client";

import { useState } from "react";
import { Icon } from "@/src/components/Icon";

export function FilterBar({ children, onReset }: { children: React.ReactNode; onReset?: () => void }) {
  return (
    <div className="mb-6 flex h-[70px] w-fit max-w-full items-stretch rounded-[10px] border border-line bg-head">
      <div className="flex w-[67px] items-center justify-center border-r border-line text-ink">
        <Icon name="filter" size={22} />
      </div>
      <div className="flex items-center border-r border-line px-6 text-sm font-bold whitespace-nowrap text-ink">Filter By</div>
      {children}
      {onReset && (
        <button type="button" className="flex items-center gap-2 px-6 text-sm font-semibold whitespace-nowrap text-alert" onClick={onReset}>
          <Icon name="reset" size={16} strokeWidth={2.5} />
          Reset Filter
        </button>
      )}
    </div>
  );
}

export function FilterChoice({
  label,
  title,
  options,
  value,
  onApply,
  multiple = false,
}: {
  label: string;
  title: string;
  options: readonly string[];
  value: string[];
  onApply: (value: string[]) => void;
  multiple?: boolean;
}) {
  const [draft, setDraft] = useState<string[] | null>(null);
  const shown = value.length === 0 ? label : value.length === 1 ? value[0] : `${label} (${value.length})`;

  function pick(option: string) {
    if (!draft) return;
    if (!multiple) setDraft([option]);
    else setDraft(draft.includes(option) ? draft.filter((item) => item !== option) : [...draft, option]);
  }

  return (
    <div className="relative flex border-r border-line">
      <button
        type="button"
        className={`flex items-center gap-[26px] px-6 text-sm font-bold whitespace-nowrap ${draft ? "text-faint" : "text-ink"}`}
        onClick={() => setDraft(draft ? null : value)}
      >
        {shown}
        <Icon name="chevronDown" size={16} strokeWidth={2.5} />
      </button>
      {draft && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setDraft(null)} />
          <div className="absolute top-full left-0 z-40 -mt-2 w-[522px] rounded-[26px] bg-surface shadow-pop">
            <div className="px-6 pt-7 pb-6">
              <p className="text-lg font-bold text-ink">{title}</p>
              <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-[15px]">
                {options.map((option) => {
                  const on = draft.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`h-[34px] truncate rounded-full border px-3 text-sm font-semibold ${on ? "border-brand bg-brand text-white" : "border-faint text-ink"}`}
                      onClick={() => pick(option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-divider px-6 pt-4 pb-6">
              {multiple && <p className="text-sm text-muted">*You can choose multiple {label.toLowerCase()}</p>}
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="h-9 w-[129px] rounded-lg bg-brand text-xs font-bold text-white shadow-[0_8px_16px_rgba(72,128,255,0.25)]"
                  onClick={() => {
                    onApply(draft);
                    setDraft(null);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
