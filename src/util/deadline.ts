import type { DeadlineLevel, SaleStatus } from "@/types";
import { COLORS } from "./constants";

export function getDeadlineLevel(paymentDeadline: string, status?: SaleStatus): DeadlineLevel {
  if (status === "Pago") return "paid";

  const [y, m, d] = paymentDeadline.split("-").map(Number);
  const deadline = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  if (days <= 7) return "danger";
  if (days <= 30) return "warn";
  return "ok";
}

export function getDeadlineColors(level: DeadlineLevel): {
  bgcolor: string;
  color: string;
} {
  switch (level) {
    case "paid":
      return { bgcolor: `${COLORS.primary}1a`, color: COLORS.primary };
    case "danger":
      return { bgcolor: COLORS.statusDanger, color: COLORS.statusDangerFg };
    case "warn":
      return { bgcolor: COLORS.statusWarn, color: COLORS.statusWarnFg };
    default:
      return { bgcolor: COLORS.statusOk, color: COLORS.statusOkFg };
  }
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
