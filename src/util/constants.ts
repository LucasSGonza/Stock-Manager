export const COLORS = {
  primary: "#741614",
  secondary: "#e7cdbb",
  muted: "#bbaa9a",
  background: "#f9f5f2",
  foreground: "#3a2a22",
  card: "#fdfaf8",
  border: "#cfc0b5",
  statusOk: "#FFED29",
  statusOkFg: "#4a3a00",
  statusWarn: "#FF991C",
  statusWarnFg: "#3a1f00",
  statusDanger: "#FF2C2C",
  statusDangerFg: "#ffffff",
  // statusPaid: "#80EF80",
  // statusPaidFg: "#1a4a1a",
} as const;

export const FONT_FAMILY = '"Tenor Sans", ui-sans-serif, system-ui, sans-serif';

export const BORDER_RADIUS = 8;

export const NAV_ITEMS = [
  { to: "/estoque", label: "Estoque" },
  { to: "/caixa", label: "Caixa" },
] as const;
