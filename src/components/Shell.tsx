"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, type IconName } from "@/src/components/Icon";
import { Logo } from "@/src/components/Logo";
import { ThemeToggle } from "@/src/components/ThemeToggle";

type NavLink = { href: string; label: string; icon: IconName };

const sections: { label: string | null; links: NavLink[] }[] = [
  {
    label: null,
    links: [
      { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
      { href: "/products", label: "Products", icon: "product" },
      { href: "/branches", label: "Branches", icon: "branch" },
      { href: "/inventory", label: "Inventory", icon: "inventory" },
      { href: "/movements", label: "Movements", icon: "movement" },
    ],
  },
  {
    label: "Access",
    links: [
      { href: "/users", label: "Users", icon: "users" },
      { href: "/roles", label: "Roles", icon: "roles" },
      { href: "/audit", label: "Audit", icon: "audit" },
    ],
  },
  {
    label: "Integration",
    links: [
      { href: "/scan", label: "Scan", icon: "scan" },
      { href: "/import", label: "Import", icon: "import" },
    ],
  },
  { label: null, links: [{ href: "/login", label: "Logout", icon: "logout" }] },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-page">
      <aside
        className={`sticky top-0 flex h-screen shrink-0 flex-col overflow-y-auto border-r border-divider bg-surface dark:border-transparent ${collapsed ? "w-[84px]" : "w-60"}`}
      >
        <div className="flex h-[70px] shrink-0 items-center justify-center">
          {collapsed ? (
            <button type="button" aria-label="Expand sidebar" className="text-ink" onClick={() => setCollapsed(false)}>
              <Icon name="menu" size={22} />
            </button>
          ) : (
            <Logo />
          )}
        </div>
        <nav className="flex flex-col pt-[11px] pb-6">
          {sections.map((section, index) => (
            <div key={section.label ?? index} className={index > 0 ? "mt-4 border-t border-divider pt-4" : ""}>
              {section.label && !collapsed && (
                <p className="mb-4 px-10 text-xs font-semibold uppercase tracking-[0.26px] text-muted">{section.label}</p>
              )}
              {section.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <div key={link.href} className="relative">
                    {active && <span className="absolute inset-y-0 left-0 w-1 rounded-r bg-brand" />}
                    {collapsed ? (
                      <Link
                        href={link.href}
                        title={link.label}
                        aria-label={link.label}
                        className={`flex h-[50px] items-center justify-center ${active ? "text-brand" : "text-muted hover:text-ink"}`}
                      >
                        <Icon name={link.icon} size={20} />
                      </Link>
                    ) : (
                      <Link
                        href={link.href}
                        className={`mx-6 flex h-[50px] items-center rounded-md pl-[54px] text-sm font-semibold tracking-[0.3px] ${active ? "bg-brand text-white" : "text-ink hover:bg-brand/10"}`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-[70px] shrink-0 items-center bg-surface px-[30px]">
          {!collapsed && (
            <button type="button" aria-label="Collapse sidebar" className="mr-6 text-ink" onClick={() => setCollapsed(true)}>
              <Icon name="menu" size={22} />
            </button>
          )}
          <label
            className={`flex h-[38px] w-[388px] items-center gap-3 rounded-full px-4 ${collapsed ? "" : "border border-line bg-field"}`}
          >
            <Icon name="search" size={16} className="shrink-0 text-faint" />
            <input placeholder="Search" className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint" />
          </label>
          <div className="ml-auto flex items-center">
            <ThemeToggle />
            <button type="button" aria-label="Notifications" className="relative ml-5 text-brand">
              <Icon name="bell" size={24} />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fall px-1 text-[10px] font-bold text-white">
                6
              </span>
            </button>
            {!collapsed && (
              <button type="button" className="ml-[31px] flex items-center gap-4 text-sm font-semibold text-muted">
                <UkFlag />
                English
                <Icon name="chevronDown" size={14} />
              </button>
            )}
            <div className="ml-[46px] flex items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand">SA</span>
              <div className="ml-5">
                <p className="text-sm font-bold text-ink">System Admin</p>
                <p className="text-xs font-semibold text-muted">Super Admin</p>
              </div>
              <span className="ml-[26px] flex h-[18px] w-[18px] items-center justify-center rounded-full border border-line text-muted">
                <Icon name="chevronDown" size={10} strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </header>
        <main className="min-w-0 flex-1 p-[30px]">{children}</main>
      </div>
    </div>
  );
}

function UkFlag() {
  return (
    <svg width="40" height="27" viewBox="0 0 60 40" className="rounded-[5px]" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}
