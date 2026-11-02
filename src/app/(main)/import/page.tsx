"use client";

import { useState } from "react";
import { Badge } from "@/src/components/Badge";
import { Card } from "@/src/components/Card";
import { SubmitButton } from "@/src/components/Form";
import { Icon } from "@/src/components/Icon";
import { PageHeader } from "@/src/components/PageHeader";
import { Cell, Row, Table } from "@/src/components/Table";
import { movementTone, titleCase, type MovementType } from "@/src/lib/format";

const preview: { row: number; sku: string; type: MovementType; quantity: number; reference: string; valid: boolean }[] = [
  { row: 2, sku: "SKU-001", type: "RECEIPT", quantity: 10, reference: "PO-100", valid: true },
  { row: 3, sku: "SKU-002", type: "ISSUE", quantity: 2, reference: "", valid: true },
  { row: 4, sku: "NO-SUCH", type: "RECEIPT", quantity: 1, reference: "", valid: false },
];

export default function ImportPage() {
  const [file, setFile] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  return (
    <div>
      <PageHeader title="Import" />
      <Card className="px-8 pt-[42px] pb-[45px]">
        <label className="mb-[34px] flex cursor-pointer flex-col items-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ECECEE] text-[#414141] dark:bg-[#F5F6FA]">
            <Icon name="import" size={28} />
          </span>
          <span className="mt-4 text-sm font-semibold text-brand">{file || "Upload File"}</span>
          <span className="mt-1 text-xs text-muted">CSV or Excel. The preview is hardcoded and the file is not parsed.</span>
          <input type="file" className="sr-only" onChange={(event) => setFile(event.target.files?.[0]?.name ?? "")} />
        </label>
        <h2 className="mb-6 text-2xl font-bold text-ink">Dry Run</h2>
        <Table head={["Row", "SKU", "Type", "Quantity", "Reference", "Result"]}>
          {preview.map((item) => (
            <Row key={item.row}>
              <Cell>{item.row}</Cell>
              <Cell mono>{item.sku}</Cell>
              <Cell>
                <Badge tone={movementTone[item.type]}>{titleCase(item.type)}</Badge>
              </Cell>
              <Cell>{item.quantity}</Cell>
              <Cell mono>{item.reference || "-"}</Cell>
              <Cell>{item.valid ? <Badge tone="success">Ready</Badge> : <Badge tone="danger">Unknown SKU</Badge>}</Cell>
            </Row>
          ))}
        </Table>
        <div className="mt-[46px] flex justify-center">
          <SubmitButton onClick={() => setConfirmed(true)}>Confirm</SubmitButton>
        </div>
        {confirmed && <p className="mt-6 text-center text-sm font-bold text-success">2 rows posted. 1 row skipped.</p>}
      </Card>
    </div>
  );
}
