import type { SaleStatus } from "@/types";

export function validateStatusSale(installmentsPaid: number, installmentsTotal: number): SaleStatus {
  if (installmentsPaid === installmentsTotal) {
    return "Pago";
  }
  if (installmentsPaid < installmentsTotal) {
    return "Pendente";
  }
  return "Atrasado";
}