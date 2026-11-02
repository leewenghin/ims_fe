"use client";

import { useState } from "react";
import { Badge } from "@/src/components/Badge";
import { Card } from "@/src/components/Card";
import { Field, FormGrid, SubmitButton } from "@/src/components/Form";
import { Icon } from "@/src/components/Icon";
import { Modal, ModalActions } from "@/src/components/Modal";
import { PageHeader, PrimaryButton } from "@/src/components/PageHeader";
import { Cell, Row, RowActions, Table } from "@/src/components/Table";

type Branch = { id: number; code: string; name: string; address: string; latitude: string; longitude: string; active: boolean };

const seed: Branch[] = [
  { id: 1, code: "HQ", name: "Headquarters", address: "Kuala Lumpur", latitude: "3.1390", longitude: "101.6869", active: true },
  { id: 2, code: "KL01", name: "KL Store", address: "Bukit Bintang", latitude: "3.1478", longitude: "101.7110", active: true },
  { id: 3, code: "PG01", name: "Penang Store", address: "George Town", latitude: "5.4141", longitude: "100.3288", active: true },
];

const empty = { code: "", name: "", address: "", latitude: "", longitude: "" };

const fields = [
  { key: "code", label: "Code", placeholder: "KL02", mono: true },
  { key: "name", label: "Name", placeholder: "Enter branch name", mono: false },
  { key: "address", label: "Address", placeholder: "Enter address", mono: false },
  { key: "latitude", label: "Latitude", placeholder: "3.1390", mono: true },
  { key: "longitude", label: "Longitude", placeholder: "101.6869", mono: true },
] as const;

export default function BranchesPage() {
  const [rows, setRows] = useState(seed);
  const [editing, setEditing] = useState<Branch | "new" | null>(null);
  const [form, setForm] = useState(empty);
  const active = rows.filter((row) => row.active);

  function save() {
    if (editing === "new") setRows((all) => [...all, { ...form, id: Date.now(), active: true }]);
    else if (editing) setRows((all) => all.map((row) => (row.id === editing.id ? { ...row, ...form } : row)));
    setEditing(null);
  }

  return (
    <div>
      <PageHeader title="Branches">
        <PrimaryButton onClick={() => { setForm(empty); setEditing("new"); }}>Add New Branch</PrimaryButton>
      </PageHeader>
      <Table head={["Code", "Name", "Address", "Status", "Action"]}>
        {active.map((row) => (
          <Row key={row.id}>
            <Cell mono>{row.code}</Cell>
            <Cell>{row.name}</Cell>
            <Cell>{row.address}</Cell>
            <Cell>
              <Badge tone="success">Active</Badge>
            </Cell>
            <Cell>
              <RowActions onEdit={() => { setForm(row); setEditing(row); }} />
            </Cell>
          </Row>
        ))}
      </Table>
      <Card title="Branch Map" className="mt-[30px]">
        <div className="relative h-[320px] overflow-hidden rounded-xl bg-panel bg-[linear-gradient(var(--divider)_1px,transparent_1px),linear-gradient(90deg,var(--divider)_1px,transparent_1px)] bg-[size:48px_48px]">
          <p className="absolute top-4 left-4 text-xs font-semibold text-faint">Map placeholder</p>
          {active.map((row) => (
            <span
              key={row.id}
              className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
              style={{ left: `${(Number(row.longitude) % 1) * 80 + 10}%`, top: `${(Number(row.latitude) % 1) * 70 + 20}%` }}
            >
              <span className="rounded-[4.5px] bg-brand px-2 py-0.5 font-mono text-xs font-bold text-white">{row.code}</span>
              <Icon name="pin" size={28} className="text-brand" />
            </span>
          ))}
        </div>
      </Card>
      {editing && (
        <Modal title={editing === "new" ? "Add New Branch" : "Edit Branch"} onClose={() => setEditing(null)}>
          <FormGrid>
            {fields.map((field) => (
              <Field key={field.key} label={field.label} value={form[field.key]} mono={field.mono} placeholder={field.placeholder} onChange={(value) => setForm({ ...form, [field.key]: value })} />
            ))}
          </FormGrid>
          <ModalActions>
            <SubmitButton onClick={save}>{editing === "new" ? "Add Now" : "Save"}</SubmitButton>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}
