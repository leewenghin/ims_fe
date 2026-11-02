"use client";

import { useState } from "react";
import { Badge } from "@/src/components/Badge";
import { FilterBar, FilterChoice } from "@/src/components/FilterBar";
import { PageHeader } from "@/src/components/PageHeader";
import { Pagination } from "@/src/components/Pagination";
import { Cell, Row, Table } from "@/src/components/Table";

const stock = [
  { branch: "HQ", sku: "SKU-001", name: "A4 Paper 80gsm", unit: "ream", quantity: 200, reorderLevel: 20 },
  { branch: "HQ", sku: "SKU-002", name: "Ballpoint Pen Blue", unit: "box", quantity: 8, reorderLevel: 10 },
  { branch: "KL01", sku: "SKU-001", name: "A4 Paper 80gsm", unit: "ream", quantity: 25, reorderLevel: 20 },
  { branch: "PG01", sku: "SKU-008", name: "USB-C Cable 1m", unit: "pcs", quantity: 4, reorderLevel: 8 },
];

const branches = ["HQ", "KL01", "PG01"] as const;

export default function InventoryPage() {
  const [branch, setBranch] = useState("HQ");
  const rows = stock.filter((row) => row.branch === branch);
  return (
    <div>
      <PageHeader title="Inventory" />
      <FilterBar>
        <FilterChoice label="Branch" title="Select Branch" options={branches} value={[branch]} onApply={([value]) => setBranch(value ?? "HQ")} />
      </FilterBar>
      <Table head={["SKU", "Name", "Unit", "Quantity", "Reorder Level", "Status"]}>
        {rows.map((row) => (
          <Row key={row.sku}>
            <Cell mono>{row.sku}</Cell>
            <Cell>{row.name}</Cell>
            <Cell>{row.unit}</Cell>
            <Cell>{row.quantity}</Cell>
            <Cell>{row.reorderLevel}</Cell>
            <Cell>{row.quantity <= row.reorderLevel ? <Badge tone="danger">Low</Badge> : <Badge tone="success">In Stock</Badge>}</Cell>
          </Row>
        ))}
      </Table>
      <Pagination from={1} to={rows.length} total={rows.length} />
    </div>
  );
}
