"use client";

import { useState } from "react";
import { Badge } from "@/src/components/Badge";
import { Card } from "@/src/components/Card";
import { Field, FormGrid, PhotoCircle, SubmitButton } from "@/src/components/Form";
import { Icon } from "@/src/components/Icon";
import { PageHeader } from "@/src/components/PageHeader";

const catalog = [
  { barcode: "9555000000011", sku: "SKU-001", name: "A4 Paper 80gsm", unit: "ream" },
  { barcode: "9555000000028", sku: "SKU-002", name: "Ballpoint Pen Blue", unit: "box" },
];

export default function ScanPage() {
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");
  const product = catalog.find((item) => item.barcode === code.trim());

  return (
    <div>
      <PageHeader title="Scan" />
      <Card className="px-8 pt-[42px] pb-[45px]">
        <PhotoCircle icon="scan" label="Scan Barcode" />
        <FormGrid>
          <Field label="Barcode" value={code} mono placeholder="9555000000011" onChange={setCode} />
          <Field label="Quantity" type="number" value={quantity} onChange={setQuantity} />
        </FormGrid>
        <div className="mx-auto mt-[30px] max-w-[780px] rounded-xl bg-panel p-6">
          {product ? (
            <div className="flex items-center gap-4">
              <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[23px] bg-tile-violet/[0.21] text-tile-violet dark:bg-tile-violet dark:text-white">
                <Icon name="product" size={28} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-ink">{product.name}</p>
                <p className="mt-1 font-mono text-[13px] text-muted">{product.sku}</p>
              </div>
              <Badge tone="brand">{product.unit}</Badge>
            </div>
          ) : (
            <p className="text-sm font-semibold text-muted">No product found. Try 9555000000011 or 9555000000028.</p>
          )}
        </div>
        {product && (
          <div className="mt-[46px] flex flex-wrap justify-center gap-4">
            <SubmitButton onClick={() => setMessage(`Receipt ${quantity} ${product.sku}`)}>Receipt</SubmitButton>
            <SubmitButton variant="outline" onClick={() => setMessage(`Issue ${quantity} ${product.sku}`)}>
              Issue
            </SubmitButton>
          </div>
        )}
        {message && <p className="mt-6 text-center text-sm font-bold text-success">{message} posted.</p>}
      </Card>
    </div>
  );
}
