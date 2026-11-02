"use client";

import { useState } from "react";
import { Badge } from "@/src/components/Badge";
import { FilterBar, FilterChoice } from "@/src/components/FilterBar";
import { Field, FormGrid, SelectField, SubmitButton } from "@/src/components/Form";
import { Modal, ModalActions } from "@/src/components/Modal";
import { PageHeader, PrimaryButton } from "@/src/components/PageHeader";
import { Pagination } from "@/src/components/Pagination";
import { Cell, Row, Table } from "@/src/components/Table";
import { formatDateTime, movementTone, titleCase, type MovementType } from "@/src/lib/format";

type Movement = { id: number; time: string; type: MovementType; sku: string; branch: string; delta: number; balance: number; source: string };

const seed: Movement[] = [
  { id: 1, time: "2026-11-02T02:10:00Z", type: "ISSUE", sku: "SKU-002", branch: "HQ", delta: -2, balance: 8, source: "MANUAL" },
  { id: 2, time: "2026-11-01T09:00:00Z", type: "RECEIPT", sku: "SKU-001", branch: "KL01", delta: 25, balance: 25, source: "MANUAL" },
];

const kinds: MovementType[] = ["RECEIPT", "ISSUE", "ADJUSTMENT", "TRANSFER"];
const branches = ["HQ", "KL01", "PG01"] as const;

export default function MovementsPage() {
  const [rows, setRows] = useState(seed);
  const [types, setTypes] = useState<string[]>([]);
  const [kind, setKind] = useState<MovementType | null>(null);
  const [sku, setSku] = useState("SKU-001");
  const [quantity, setQuantity] = useState("1");
  const [branch, setBranch] = useState("HQ");
  const [target, setTarget] = useState("KL01");
  const visible = rows.filter((row) => types.length === 0 || types.includes(titleCase(row.type)));

  function post(type: MovementType) {
    const amount = Number(quantity) || 0;
    const delta = type === "ISSUE" ? -amount : amount;
    const source = type === "TRANSFER" ? `TRANSFER ${branch}>${target}` : "MANUAL";
    setRows((all) => [{ id: Date.now(), time: new Date().toISOString(), type, sku, branch, delta, balance: 0, source }, ...all]);
    setKind(null);
  }

  return (
    <div>
      <PageHeader title="Movements">
        {kinds.map((item) => (
          <PrimaryButton key={item} onClick={() => setKind(item)}>
            {titleCase(item)}
          </PrimaryButton>
        ))}
      </PageHeader>
      <FilterBar onReset={() => setTypes([])}>
        <FilterChoice label="Type" title="Select Movement Type" options={kinds.map(titleCase)} value={types} multiple onApply={setTypes} />
      </FilterBar>
      <Table head={["Time", "Type", "SKU", "Branch", "Delta", "Balance", "Source"]}>
        {visible.map((row) => (
          <Row key={row.id}>
            <Cell>{formatDateTime(row.time)}</Cell>
            <Cell>
              <Badge tone={movementTone[row.type]}>{titleCase(row.type)}</Badge>
            </Cell>
            <Cell mono>{row.sku}</Cell>
            <Cell mono>{row.branch}</Cell>
            <Cell className={row.delta < 0 ? "text-fall" : "text-success"}>{row.delta > 0 ? `+${row.delta}` : row.delta}</Cell>
            <Cell>{row.balance}</Cell>
            <Cell mono>{row.source}</Cell>
          </Row>
        ))}
      </Table>
      <Pagination from={1} to={visible.length} total={visible.length} />
      {kind && (
        <Modal title={`New ${titleCase(kind)}`} onClose={() => setKind(null)}>
          <FormGrid>
            <Field label="SKU" value={sku} mono onChange={setSku} />
            <Field label={kind === "ADJUSTMENT" ? "Quantity (+/-)" : "Quantity"} type="number" value={quantity} onChange={setQuantity} />
            <SelectField label={kind === "TRANSFER" ? "From Branch" : "Branch"} value={branch} options={branches} onChange={setBranch} />
            {kind === "TRANSFER" && <SelectField label="To Branch" value={target} options={branches} onChange={setTarget} />}
          </FormGrid>
          <ModalActions>
            <SubmitButton onClick={() => post(kind)}>Post</SubmitButton>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}
