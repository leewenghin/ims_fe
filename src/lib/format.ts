import type { Tone } from "@/src/components/Badge";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// UTC on purpose: the server and the browser must render the same text.
export function formatDate(iso: string) {
  const date = new Date(iso);
  return `${String(date.getUTCDate()).padStart(2, "0")} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatDateTime(iso: string) {
  const date = new Date(iso);
  const hours = date.getUTCHours();
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${formatDate(iso)} - ${String(hours % 12 || 12).padStart(2, "0")}:${minutes} ${hours < 12 ? "AM" : "PM"}`;
}

export type MovementType = "RECEIPT" | "ISSUE" | "ADJUSTMENT" | "TRANSFER";

export const movementTone: Record<MovementType, Tone> = {
  RECEIPT: "success",
  ISSUE: "danger",
  ADJUSTMENT: "warning",
  TRANSFER: "magenta",
};

export function titleCase(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}
