"use client";

import { useState } from "react";
import { Badge, type Tone } from "@/src/components/Badge";
import { FilterBar, FilterChoice } from "@/src/components/FilterBar";
import { PageHeader } from "@/src/components/PageHeader";
import { Pagination } from "@/src/components/Pagination";
import { Cell, Row, Table } from "@/src/components/Table";
import { formatDateTime, titleCase } from "@/src/lib/format";

type Action = "CREATE" | "UPDATE" | "DEACTIVATE" | "RECEIPT" | "ISSUE";

const actionTone: Record<Action, Tone> = {
  CREATE: "success",
  UPDATE: "violet",
  DEACTIVATE: "danger",
  RECEIPT: "success",
  ISSUE: "warning",
};

const rows: { time: string; actor: string; action: Action; entity: string; branch: string; details: string }[] = [
  { time: "2026-11-02T02:10:00Z", actor: "manager", action: "ISSUE", entity: "stock_movement", branch: "HQ", details: "SKU-002 delta -2" },
  { time: "2026-11-01T08:00:00Z", actor: "admin", action: "UPDATE", entity: "product", branch: "", details: "SKU-001 reorder 20" },
];

const actions = Object.keys(actionTone).map(titleCase);
const entities = ["product", "branch", "stock_movement", "user", "role"] as const;

export default function AuditPage() {
  const [action, setAction] = useState<string[]>([]);
  const [entity, setEntity] = useState<string[]>([]);
  const visible = rows.filter((row) => (action.length === 0 || action.includes(titleCase(row.action))) && (entity.length === 0 || entity.includes(row.entity)));

  return (
    <div>
      <PageHeader title="Audit" />
      <FilterBar onReset={() => { setAction([]); setEntity([]); }}>
        <FilterChoice label="Action" title="Select Action" options={actions} value={action} multiple onApply={setAction} />
        <FilterChoice label="Entity" title="Select Entity" options={entities} value={entity} multiple onApply={setEntity} />
      </FilterBar>
      <Table head={["Time", "Actor", "Action", "Entity", "Branch", "Details"]} empty="No audit entries match.">
        {visible.map((row) => (
          <Row key={row.time + row.action}>
            <Cell>{formatDateTime(row.time)}</Cell>
            <Cell mono>{row.actor}</Cell>
            <Cell>
              <Badge tone={actionTone[row.action]}>{titleCase(row.action)}</Badge>
            </Cell>
            <Cell mono>{row.entity}</Cell>
            <Cell mono>{row.branch || "-"}</Cell>
            <Cell mono>{row.details}</Cell>
          </Row>
        ))}
      </Table>
      <Pagination from={1} to={visible.length} total={visible.length} />
    </div>
  );
}
