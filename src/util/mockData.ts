import type { DClothing, DSale } from "@/types";

export const mockedClothes: DClothing[] = [
  { id: 1001, name: "Vestido Floral Midi", category: "Vestido", size: "M", quantity: 8, price: 189.9 },
  { id: 1002, name: "Blusa de Linho Off-White", category: "Blusa", size: "P", quantity: 12, price: 119.0 },
  { id: 1003, name: "Calça Wide Leg Terracota", category: "Calça", size: "G", quantity: 5, price: 249.5 },
  { id: 1004, name: "Saia Plissada Acetinada", category: "Saia", size: "M", quantity: 7, price: 159.0 },
  { id: 1005, name: "Blazer Alfaiataria Caramelo", category: "Blazer", size: "G", quantity: 3, price: 399.0 },
  { id: 1006, name: "Camisa Cropped Cru", category: "Camisa", size: "P", quantity: 10, price: 139.9 },
  { id: 1007, name: "Macacão Pantalona Vinho", category: "Macacão", size: "M", quantity: 4, price: 329.0 },
  { id: 1008, name: "Conjunto Tricot Areia", category: "Conjunto", size: "U", quantity: 6, price: 279.9 },
  { id: 1009, name: "Camisa térmica Preta", category: "Camisa", size: "P", quantity: 2, price: 100.0 },
];

export const mockedSales: DSale[] = [
  { id: 5001, customerName: "Marina Souza", clothingName: "Vestido Floral Midi", price: 189.9, purchaseDate: "2025-10-01", paymentDeadline: "2025-11-01", installmentsPaid: 1, installmentsTotal: 1 },
  { id: 5002, customerName: "Júlia Mendes", clothingName: "Blazer Alfaiataria Caramelo", price: 399.0, purchaseDate: "2025-10-05", paymentDeadline: "2026-01-05", installmentsPaid: 1, installmentsTotal: 3 },
  { id: 5003, customerName: "Camila Rocha", clothingName: "Calça Wide Leg Terracota", price: 249.5, purchaseDate: "2026-02-12", paymentDeadline: "2026-04-12", installmentsPaid: 0, installmentsTotal: 2 },
  { id: 5004, customerName: "Patrícia Lima", clothingName: "Macacão Pantalona Vinho", price: 329.0, purchaseDate: "2026-06-03", paymentDeadline: "2026-10-03", installmentsPaid: 1, installmentsTotal: 4 },
  { id: 5005, customerName: "Beatriz Alves", clothingName: "Saia Plissada Acetinada", price: 159.0, purchaseDate: "2025-11-27", paymentDeadline: "2026-01-27", installmentsPaid: 1, installmentsTotal: 2 },
  { id: 5006, customerName: "Helena Castro", clothingName: "Conjunto Tricot Areia", price: 279.9, purchaseDate: "2026-01-10", paymentDeadline: "2026-04-10", installmentsPaid: 3, installmentsTotal: 3 },
  { id: 5007, customerName: "Larissa Pinto", clothingName: "Blusa de Linho Off-White", price: 119.0, purchaseDate: "2026-05-30", paymentDeadline: "2026-06-30", installmentsPaid: 1, installmentsTotal: 1 },
  { id: 5008, customerName: "Sofia Andrade", clothingName: "Camisa Cropped Cru", price: 139.9, purchaseDate: "2026-04-22", paymentDeadline: "2026-07-22", installmentsPaid: 2, installmentsTotal: 3 },
  { id: 5009, customerName: "Sofia Andrade", clothingName: "Blusa de Linho Off-White", price: 119.0, purchaseDate: "2026-04-22", paymentDeadline: "2026-05-22", installmentsPaid: 0, installmentsTotal: 1 },
  { id: 5010, customerName: "Júlia Mendes", clothingName: "Camisa térmica Preta", price: 100.0, purchaseDate: "2026-07-09", paymentDeadline: "2026-08-09", installmentsPaid: 0, installmentsTotal: 1 },
];