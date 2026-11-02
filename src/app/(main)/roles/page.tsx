"use client";

import { useState } from "react";
import type { Tone } from "@/src/components/Badge";
import { Icon } from "@/src/components/Icon";
import { PageHeader } from "@/src/components/PageHeader";
import { Pagination } from "@/src/components/Pagination";

const permissions = ["BRANCH_VIEW", "BRANCH_MANAGE", "USER_VIEW", "USER_MANAGE", "ROLE_MANAGE", "PRODUCT_VIEW", "PRODUCT_MANAGE", "INVENTORY_VIEW", "STOCK_RECEIVE", "STOCK_ISSUE", "STOCK_ADJUST", "STOCK_TRANSFER", "STOCK_IMPORT", "AUDIT_VIEW", "BRANCH_SCOPE_ALL"];

type Group = "Branch" | "Access" | "Product" | "Stock" | "Audit";

const groups: Record<Group, { tone: Tone; square: string }> = {
  Branch: { tone: "success", square: "border-success" },
  Access: { tone: "brand", square: "border-brand" },
  Product: { tone: "warning", square: "border-warning" },
  Stock: { tone: "magenta", square: "border-magenta" },
  Audit: { tone: "violet", square: "border-violet" },
};

const chip: Record<Tone, string> = {
  success: "bg-success/20 text-success",
  brand: "bg-brand/20 text-brand",
  warning: "bg-warning/20 text-warning",
  magenta: "bg-magenta/20 text-magenta",
  violet: "bg-violet/20 text-violet",
  danger: "bg-danger/20 text-danger",
};

function groupOf(code: string): Group {
  if (code.startsWith("BRANCH")) return "Branch";
  if (code.startsWith("USER") || code.startsWith("ROLE")) return "Access";
  if (code.startsWith("PRODUCT")) return "Product";
  if (code.startsWith("AUDIT")) return "Audit";
  return "Stock";
}

type Role = { name: string; system: boolean; granted: string[] };

const seed: Role[] = [
  { name: "Super Admin", system: true, granted: permissions },
  { name: "Manager", system: false, granted: ["PRODUCT_VIEW", "INVENTORY_VIEW", "STOCK_RECEIVE", "STOCK_ISSUE"] },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(seed);
  const [selected, setSelected] = useState(0);
  const [group, setGroup] = useState<Group | null>(null);
  const [q, setQ] = useState("");
  const role = roles[selected];
  const visible = permissions.filter((code) => (group === null || groupOf(code) === group) && code.toLowerCase().includes(q.trim().toLowerCase()));

  function toggle(code: string) {
    if (role.system) return;
    setRoles((all) =>
      all.map((item, index) => {
        if (index !== selected) return item;
        const granted = item.granted.includes(code) ? item.granted.filter((value) => value !== code) : [...item.granted, code];
        return { ...item, granted };
      }),
    );
  }

  return (
    <div>
      <PageHeader title="Roles" />
      <div className="grid gap-5 lg:grid-cols-[286px_1fr]">
        <aside className="h-fit rounded-[14px] bg-surface p-6 shadow-card dark:border dark:border-line">
          <p className="text-base font-bold text-ink">Roles</p>
          <ul className="mt-4 flex flex-col gap-1">
            {roles.map((item, index) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={`flex h-[43px] w-full items-center justify-between rounded px-4 text-sm ${index === selected ? "bg-brand/15 font-bold text-brand" : "font-semibold text-ink hover:bg-field"}`}
                  onClick={() => setSelected(index)}
                >
                  <span className="flex items-center gap-3">
                    <Icon name="roles" size={16} />
                    {item.name}
                  </span>
                  <span className={index === selected ? "text-brand" : "text-muted"}>{item.granted.length}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-bold text-ink">Group</p>
          <ul className="mt-4 flex flex-col gap-1">
            {(Object.keys(groups) as Group[]).map((name) => (
              <li key={name}>
                <button
                  type="button"
                  className={`flex h-[43px] w-full items-center gap-3 rounded px-4 text-sm font-semibold ${group === name ? "bg-field text-ink" : "text-ink hover:bg-field"}`}
                  onClick={() => setGroup(group === name ? null : name)}
                >
                  <span className={`h-[15px] w-[15px] rounded-[3px] border-2 ${groups[name].square}`} />
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <div>
          <section className="overflow-hidden rounded-[14px] bg-surface shadow-card dark:border dark:border-line">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6">
              <label className="flex h-[38px] w-[337px] max-w-full items-center gap-3 rounded-full border border-line bg-field px-4">
                <Icon name="search" size={16} className="shrink-0 text-faint" />
                <input value={q} placeholder="Search permission" className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint" onChange={(event) => setQ(event.target.value)} />
              </label>
              <div>
                <p className="text-base font-bold text-ink">{role.name}</p>
                {role.system && <p className="text-xs font-semibold text-muted">System role. Cannot be edited.</p>}
              </div>
            </div>
            <ul>
              {visible.map((code) => {
                const on = role.granted.includes(code);
                const tone = groups[groupOf(code)].tone;
                return (
                  <li key={code} className={`border-t border-divider ${on ? "bg-brand/5" : ""}`}>
                    <label className={`flex h-[62px] items-center gap-6 px-6 ${role.system ? "cursor-not-allowed" : "cursor-pointer"}`}>
                      <input type="checkbox" checked={on} disabled={role.system} className="h-[18px] w-[18px] accent-brand" onChange={() => toggle(code)} />
                      <Icon name={on ? "check" : "close"} size={16} className={on ? "text-success" : "text-faint"} />
                      <span className={`inline-flex h-[23px] min-w-[60px] items-center justify-center rounded-[4px] px-2 text-xs font-bold ${chip[tone]}`}>{groupOf(code)}</span>
                      <span className="font-mono text-[13px] font-semibold text-ink">{code}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
          <Pagination from={1} to={visible.length} total={visible.length} />
        </div>
      </div>
    </div>
  );
}
