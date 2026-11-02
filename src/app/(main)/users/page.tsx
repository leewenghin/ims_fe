"use client";

import { useState } from "react";
import { Badge } from "@/src/components/Badge";
import { Field, FormGrid, SelectField, SubmitButton } from "@/src/components/Form";
import { Icon } from "@/src/components/Icon";
import { Modal, ModalActions } from "@/src/components/Modal";
import { PageHeader, PrimaryButton } from "@/src/components/PageHeader";

type User = { id: number; username: string; fullName: string; role: string; branch: string; active: boolean; password: string };

const seed: User[] = [
  { id: 1, username: "admin", fullName: "System Admin", role: "Super Admin", branch: "", active: true, password: "" },
  { id: 2, username: "manager", fullName: "HQ Manager", role: "Manager", branch: "HQ", active: true, password: "" },
];

const roles = ["Super Admin", "Manager", "Staff"] as const;
const branches = ["All", "HQ", "KL01", "PG01"] as const;
const avatars = [
  "bg-tile-violet/[0.21] text-tile-violet",
  "bg-tile-yellow/[0.21] text-tile-yellow",
  "bg-tile-green/[0.21] text-tile-green",
  "bg-tile-orange/[0.21] text-tile-orange",
];

const empty = { username: "", fullName: "", role: "Staff", branch: "HQ", password: "" };

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function UsersPage() {
  const [rows, setRows] = useState(seed);
  const [editing, setEditing] = useState<User | "new" | null>(null);
  const [form, setForm] = useState(empty);

  function save() {
    if (editing === "new") setRows((all) => [...all, { ...form, id: Date.now(), active: true }]);
    else if (editing) setRows((all) => all.map((row) => (row.id === editing.id ? { ...row, ...form } : row)));
    setEditing(null);
  }

  return (
    <div>
      <PageHeader title="Users">
        <PrimaryButton onClick={() => { setForm(empty); setEditing("new"); }}>Add New User</PrimaryButton>
      </PageHeader>
      <div className="grid gap-[30px] sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((row, index) => (
          <div key={row.id} className="flex flex-col items-center rounded-[14px] bg-surface px-4 pt-[46px] pb-[30px] text-center shadow-card dark:border dark:border-line">
            <span className={`flex h-[110px] w-[110px] items-center justify-center rounded-full text-[28px] font-bold ${avatars[index % avatars.length]}`}>
              {initials(row.fullName || row.username)}
            </span>
            <p className="mt-[22px] text-base font-bold text-ink">{row.fullName}</p>
            <p className="mt-1 text-sm font-semibold text-muted">{row.role}</p>
            <p className="mt-3 font-mono text-[13px] text-ink">{row.username}</p>
            <div className="mt-4 flex items-center gap-2">
              <Badge tone="brand">{row.branch || "All branches"}</Badge>
              {row.active ? <Badge tone="success">Active</Badge> : <Badge tone="danger">Inactive</Badge>}
            </div>
            <button
              type="button"
              className="mt-6 flex h-10 w-[138px] items-center justify-center gap-2 rounded-lg border border-line text-sm font-semibold text-muted hover:text-ink"
              onClick={() => { setForm(row); setEditing(row); }}
            >
              <Icon name="edit" size={14} />
              Edit
            </button>
          </div>
        ))}
      </div>
      {editing && (
        <Modal title={editing === "new" ? "Add New User" : "Edit User"} onClose={() => setEditing(null)}>
          <FormGrid>
            <Field label="Username" value={form.username} mono placeholder="Enter username" onChange={(value) => setForm({ ...form, username: value })} />
            <Field label="Full Name" value={form.fullName} placeholder="Enter full name" onChange={(value) => setForm({ ...form, fullName: value })} />
            <SelectField label="Role" value={form.role} options={roles} onChange={(value) => setForm({ ...form, role: value })} />
            <SelectField label="Branch" value={form.branch || "All"} options={branches} onChange={(value) => setForm({ ...form, branch: value === "All" ? "" : value })} />
            <Field
              label={editing === "new" ? "Password" : "New Password"}
              type="password"
              value={form.password}
              placeholder={editing === "new" ? "Enter password" : "Leave blank to keep"}
              onChange={(value) => setForm({ ...form, password: value })}
            />
          </FormGrid>
          <ModalActions>
            <SubmitButton onClick={save}>{editing === "new" ? "Add Now" : "Save"}</SubmitButton>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}
