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
  border: string;
} {
  switch (level) {
    case "paid":
      return { bgcolor: `${COLORS.primary}1a`, color: COLORS.primary, border: `${COLORS.primary}4d` };
    case "danger":
      return { bgcolor: COLORS.statusDanger, color: COLORS.statusDangerFg, border: `${COLORS.statusDanger}4d` };
    case "warn":
      return { bgcolor: `${COLORS.statusWarn}30`, color: COLORS.statusWarnFg, border: `${COLORS.statusWarn}4d` };
    default:
      return { bgcolor: `${COLORS.statusOk}25`, color: COLORS.statusOkFg, border: `${COLORS.statusOk}4d` };
  }
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
