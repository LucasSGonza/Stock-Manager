import type { DeadlineLevel } from "@/types";
import { COLORS } from "./constants";

export function getDeadlineLevel(deadlineISO: string): DeadlineLevel {
  const deadline = new Date(deadlineISO);
  const now = new Date();
  const days = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (days <= 7) return "danger";
  if (days <= 30) return "warn";
  return "ok";
}

export function getDeadlineColors(level: DeadlineLevel): {
  bgcolor: string;
  color: string;
} {
  switch (level) {
    case "danger":
      return { bgcolor: COLORS.statusDanger, color: COLORS.statusDangerFg };
    case "warn":
      return { bgcolor: COLORS.statusWarn, color: COLORS.statusWarnFg };
    default:
      return { bgcolor: COLORS.statusOk, color: COLORS.statusOkFg };
  }
}

export function formatDateBR(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
