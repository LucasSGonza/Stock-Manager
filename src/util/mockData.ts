import type { DClothing, DSale } from "@/types";

export const initialClothes: DClothing[] = [
  { id: 1001, name: "Vestido Floral Midi", category: "Vestido", size: "M", quantity: 8, price: 189.9 },
  { id: 1002, name: "Blusa de Linho Off-White", category: "Blusa", size: "P", quantity: 12, price: 119.0 },
  { id: 1003, name: "Calça Wide Leg Terracota", category: "Calça", size: "G", quantity: 5, price: 249.5 },
  { id: 1004, name: "Saia Plissada Acetinada", category: "Saia", size: "M", quantity: 7, price: 159.0 },
  { id: 1005, name: "Blazer Alfaiataria Caramelo", category: "Blazer", size: "G", quantity: 3, price: 399.0 },
  { id: 1006, name: "Camisa Cropped Cru", category: "Camisa", size: "P", quantity: 10, price: 139.9 },
  { id: 1007, name: "Macacão Pantalona Vinho", category: "Macacão", size: "M", quantity: 4, price: 329.0 },
  { id: 1008, name: "Conjunto Tricot Areia", category: "Conjunto", size: "U", quantity: 6, price: 279.9 },
];

const today = new Date();
const inDays = (d: number): string => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() + d);
  return dt.toISOString().slice(0, 10);
};
const daysAgo = (d: number): string => inDays(-d);

export const initialSales: DSale[] = [
  { id: 5001, customer: "Marina Souza", clothingName: "Vestido Floral Midi", price: 189.9, purchaseDate: daysAgo(40), status: "Pago", paymentDeadline: daysAgo(10) },
  { id: 5002, customer: "Júlia Mendes", clothingName: "Blazer Alfaiataria Caramelo", price: 399.0, purchaseDate: daysAgo(20), status: "Pendente", paymentDeadline: inDays(45) },
  { id: 5003, customer: "Camila Rocha", clothingName: "Calça Wide Leg Terracota", price: 249.5, purchaseDate: daysAgo(15), status: "Pendente", paymentDeadline: inDays(20) },
  { id: 5004, customer: "Patrícia Lima", clothingName: "Macacão Pantalona Vinho", price: 329.0, purchaseDate: daysAgo(10), status: "Pendente", paymentDeadline: inDays(5) },
  { id: 5005, customer: "Beatriz Alves", clothingName: "Saia Plissada Acetinada", price: 159.0, purchaseDate: daysAgo(35), status: "Atrasado", paymentDeadline: daysAgo(3) },
  { id: 5006, customer: "Helena Castro", clothingName: "Conjunto Tricot Areia", price: 279.9, purchaseDate: daysAgo(5), status: "Pago", paymentDeadline: inDays(25) },
  { id: 5007, customer: "Larissa Pinto", clothingName: "Blusa de Linho Off-White", price: 119.0, purchaseDate: daysAgo(2), status: "Pendente", paymentDeadline: inDays(60) },
  { id: 5008, customer: "Sofia Andrade", clothingName: "Camisa Cropped Cru", price: 139.9, purchaseDate: daysAgo(8), status: "Pendente", paymentDeadline: inDays(2) },
];
