export const COLORS = {
  primary: "#741614",
  secondary: "#e7cdbb",
  muted: "#bbaa9a",
  background: "#f9f5f2",
  foreground: "#3a2a22",
  card: "#fdfaf8",
  border: "#cfc0b5",
  statusOk: "#7a8c5e",
  statusOkFg: "#4b5a34",
  statusWarn: "#b87a2e",
  statusWarnFg: "#6b4518",
  statusDanger: "#FF2C2C",
  statusDangerFg: "#ffffff",
  statusDangerHover: "#e02020",
  contrastText: "#faf5f2",
} as const;

export const SHADOWS = {
  card: "0 1px 3px rgba(0,0,0,0.08)",
} as const;

export const FONT_FAMILY = '"Tenor Sans", ui-sans-serif, system-ui, sans-serif';

export const BORDER_RADIUS = 8;

export const NAV_ITEMS = [
  { to: "/estoque", label: "Estoque" },
  { to: "/caixa", label: "Caixa" },
  { to: "/config", label: "Configuração" },
] as const;
