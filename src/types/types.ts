export interface DClothing {
  id: number;
  name: string;
  category: string;
  size: string;
  quantity: number;
  price: number;
}

export type SaleStatus = "Pago" | "Pendente" | "Atrasado";

export interface DSale {
  id: number;
  customer: string;
  clothingName: string;
  price: number;
  purchaseDate: string;
  status: SaleStatus;
  paymentDeadline: string;
}

export type DeadlineLevel = "ok" | "warn" | "danger";
