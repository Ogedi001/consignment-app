import { cn } from "@/shared/lib/utils";
import type { OrderStatus } from "../types";

const labels: Record<OrderStatus, string> = {
  "action-required": "Action required",
  "in-transit": "In transit",
  completed: "Completed",
};

export function Status({ status }: { status: OrderStatus }) {
  const className = status === "action-required" ? "border-warning/30 bg-warning/10 text-amber-800" : status === "completed" ? "border-success/30 bg-success/10 text-green-800" : "border-info/30 bg-info/10 text-blue-800";
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", className)}>{labels[status]}</span>;
}
