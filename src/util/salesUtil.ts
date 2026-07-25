import type { SaleStatus } from "@/types";

export function validateStatusSale(
  paymentDeadline: string,
  installmentsPaid: number,
  installmentsTotal: number,
): SaleStatus {
  if (installmentsPaid >= installmentsTotal) {
    return "Pago";
  }
  const today = new Date();
  const deadlineDate = new Date(paymentDeadline);
  if (today > deadlineDate) {
    return "Atrasado";
  }
  return "Pendente";
}
