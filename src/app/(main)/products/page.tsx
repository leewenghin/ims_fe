"use client";

import { useMemo, useState } from "react";
import { FilterBar, FilterChoice } from "@/src/components/FilterBar";
import { Field, FormGrid, SelectField, SubmitButton } from "@/src/components/Form";
import { Icon } from "@/src/components/Icon";
import { Modal, ModalActions } from "@/src/components/Modal";
import { PageHeader, PrimaryButton } from "@/src/components/PageHeader";
import { Pagination } from "@/src/components/Pagination";
import { Cell, Row, RowActions, Table } from "@/src/components/Table";

type Product = {
  id: number;
  sku: string;
  barcode: string;
  name: string;
  description: string;
  category: string;
  unit: string;
  reorderLevel: number;
  occurredAt: string;
  active: boolean;
};

const seed: Product[] = [
  { id: 1, sku: "SKU-001", barcode: "9555000000011", name: "A4 Paper 80gsm", description: "500 sheets", category: "Stationery", unit: "ream", reorderLevel: 20, occurredAt: "2026-10-29T07:00:00Z", active: true },
  { id: 2, sku: "SKU-002", barcode: "9555000000028", name: "Ballpoint Pen Blue", description: "", category: "Stationery", unit: "box", reorderLevel: 10, occurredAt: "2026-10-30T07:00:00Z", active: true },
  { id: 3, sku: "SKU-008", barcode: "9555000000080", name: "USB-C Cable 1m", description: "", category: "Electronics", unit: "pcs", reorderLevel: 8, occurredAt: "2026-10-28T07:00:00Z", active: true },
];

const categories = ["Stationery", "Electronics", "Cleaning", "Pantry", "Hardware"] as const;
const units = ["pcs", "box", "ream", "kg"] as const;
const sizes = ["All", "1", "2", "5", "10"] as const;
const sorts = ["occurred_at", "name"] as const;
const directions = ["desc", "asc"] as const;

const empty = { sku: "", barcode: "", name: "", description: "", category: "", unit: "pcs", reorderLevel: 0 };

export default function ProductsPage() {
  const [rows, setRows] = useState(seed);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState("");
  const [sortBy, setSortBy] = useState<string>("occurred_at");
  const [direction, setDirection] = useState<string>("desc");
  const [category, setCategory] = useState<string[]>([]);
  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [form, setForm] = useState(empty);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const active = rows.filter(
      (row) =>
        row.active &&
        (category.length === 0 || category.includes(row.category)) &&
        (term === "" || row.name.toLowerCase().includes(term) || row.sku.toLowerCase().includes(term)),
    );
    return [...active].sort((a, b) => {
      const left = sortBy === "name" ? a.name : a.occurredAt;
      const right = sortBy === "name" ? b.name : b.occurredAt;
      return direction === "asc" ? left.localeCompare(right) : right.localeCompare(left);
    });
  }, [rows, q, category, sortBy, direction]);

  const pageSize = size === "" ? Math.max(filtered.length, 1) : Number(size);
  const pageCount = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const current = Math.min(page, pageCount);
  const start = (current - 1) * pageSize;
  const visible = filtered.slice(start, start + pageSize);

  function openNew() {
    setForm(empty);
    setEditing("new");
  }

  function openEdit(row: Product) {
    setForm(row);
    setEditing(row);
  }

  function save() {
    if (editing === "new") {
      setRows((all) => [...all, { ...form, id: Date.now(), sku: form.sku.toUpperCase(), occurredAt: new Date().toISOString(), active: true }]);
    } else if (editing) {
      setRows((all) => all.map((row) => (row.id === editing.id ? { ...row, ...form, sku: form.sku.toUpperCase() } : row)));
    }
    setEditing(null);
  }

  return (
    <div>
      <PageHeader title="Products">
        <label className="flex h-[38px] w-[253px] items-center gap-3 rounded-full border border-line bg-surface px-4">
          <Icon name="search" size={16} className="shrink-0 text-faint" />
          <input
            value={q}
            placeholder="Search product name"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-faint"
            onChange={(event) => {
              setQ(event.target.value);
              setPage(1);
            }}
          />
        </label>
        <PrimaryButton onClick={openNew}>Add New Product</PrimaryButton>
      </PageHeader>
      <FilterBar
        onReset={() => {
          setCategory([]);
          setSortBy("occurred_at");
          setDirection("desc");
          setSize("");
          setPage(1);
        }}
      >
        <FilterChoice label="Category" title="Select Category" options={categories} value={category} multiple onApply={(value) => { setCategory(value); setPage(1); }} />
        <FilterChoice label="Sort By" title="Select sort_by" options={sorts} value={[sortBy]} onApply={([value]) => setSortBy(value ?? "occurred_at")} />
        <FilterChoice label="Direction" title="Select sort_direction" options={directions} value={[direction]} onApply={([value]) => setDirection(value ?? "desc")} />
        <FilterChoice
          label="Size"
          title="Select page size"
          options={sizes}
          value={[size === "" ? "All" : size]}
          onApply={([value]) => {
            setSize(!value || value === "All" ? "" : value);
            setPage(1);
          }}
        />
      </FilterBar>
      <Table head={["SKU", "Name", "Category", "Unit", "Reorder Level", "Action"]} empty="No products match.">
        {visible.map((row) => (
          <Row key={row.id}>
            <Cell mono>{row.sku}</Cell>
            <Cell>{row.name}</Cell>
            <Cell>{row.category}</Cell>
            <Cell>{row.unit}</Cell>
            <Cell>{row.reorderLevel}</Cell>
            <Cell>
              <RowActions
                deleteLabel="Deactivate"
                onEdit={() => openEdit(row)}
                onDelete={() => setRows((all) => all.map((item) => (item.id === row.id ? { ...item, active: false } : item)))}
              />
            </Cell>
          </Row>
        ))}
      </Table>
      <Pagination
        from={start + 1}
        to={start + visible.length}
        total={filtered.length}
        onPrev={current > 1 ? () => setPage(current - 1) : undefined}
        onNext={current < pageCount ? () => setPage(current + 1) : undefined}
      />
      {editing && (
        <Modal title={editing === "new" ? "Add New Product" : "Edit Product"} onClose={() => setEditing(null)}>
          <FormGrid>
            <Field label="SKU" value={form.sku} mono placeholder="SKU-001" onChange={(value) => setForm({ ...form, sku: value })} />
            <Field label="Barcode" value={form.barcode} mono placeholder="9555000000011" onChange={(value) => setForm({ ...form, barcode: value })} />
            <Field label="Name" value={form.name} placeholder="Enter product name" onChange={(value) => setForm({ ...form, name: value })} />
            <Field label="Category" value={form.category} placeholder="Stationery" onChange={(value) => setForm({ ...form, category: value })} />
            <SelectField label="Unit" value={form.unit} options={units} onChange={(value) => setForm({ ...form, unit: value })} />
            <Field label="Reorder Level" type="number" value={form.reorderLevel} onChange={(value) => setForm({ ...form, reorderLevel: Number(value) })} />
            <div className="sm:col-span-2">
              <Field label="Description" value={form.description} placeholder="Enter a short description" onChange={(value) => setForm({ ...form, description: value })} />
            </div>
          </FormGrid>
          <ModalActions>
            <SubmitButton onClick={save}>{editing === "new" ? "Add Now" : "Save"}</SubmitButton>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}
