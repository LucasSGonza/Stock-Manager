import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AppLayout } from "@/components/AppLayout";
import { initialSales, formatBRL, formatDateBR, getDeadlineLevel, getDeadlineColors } from "@/util";
import type { DSale, SaleStatus } from "@/types";
import { COLORS } from "@/util";

const STATUS_STYLES: Record<SaleStatus, { bgcolor: string; color: string; border: string }> = {
  Pago: {
    bgcolor: `${COLORS.primary}1a`,
    color: COLORS.primary,
    border: `${COLORS.primary}4d`,
  },
  Pendente: {
    bgcolor: COLORS.secondary,
    color: COLORS.foreground,
    border: COLORS.border,
  },
  Atrasado: {
    bgcolor: COLORS.statusDanger,
    color: COLORS.statusDangerFg,
    border: "transparent",
  },
};

function StatusBadge({ status }: { status: SaleStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <Chip
      label={status}
      size="small"
      variant="outlined"
      sx={{
        bgcolor: s.bgcolor,
        color: s.color,
        borderColor: s.border,
        fontWeight: 600,
        fontSize: "0.75rem",
        height: 24,
      }}
    />
  );
}

function DeadlineBadge({ iso }: { iso: string }) {
  const level = getDeadlineLevel(iso);
  const { bgcolor, color } = getDeadlineColors(level);
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 1,
        px: 1.25,
        py: 0.5,
        fontSize: "0.75rem",
        fontWeight: 500,
        bgcolor,
        color,
      }}
    >
      {formatDateBR(iso)}
    </Box>
  );
}

interface SummaryCardProps {
  label: string;
  value: number;
  tone: "ok" | "warn" | "danger";
}

function SummaryCard({ label, value, tone }: SummaryCardProps) {
  const borderColor =
    tone === "danger"
      ? COLORS.statusDanger
      : tone === "warn"
      ? COLORS.statusWarn
      : COLORS.primary;

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `1px solid ${COLORS.border}`,
        bgcolor: "background.paper",
        p: 2,
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <Typography
        variant="caption"
        sx={{
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "text.secondary",
          display: "block",
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{ fontSize: "1.25rem", mt: 0.5, fontFamily: "inherit" }}
      >
        {formatBRL(value)}
      </Typography>
    </Box>
  );
}

export function CaixaPage(){
  const [sales] = useState<DSale[]>(initialSales);

  const totals = useMemo(() => {
    const paid = sales
      .filter((s) => s.status === "Pago")
      .reduce((acc, s) => acc + s.price, 0);
    const pending = sales
      .filter((s) => s.status === "Pendente")
      .reduce((acc, s) => acc + s.price, 0);
    const overdue = sales
      .filter((s) => s.status === "Atrasado")
      .reduce((acc, s) => acc + s.price, 0);
    return { paid, pending, overdue };
  }, [sales]);

  return (
    <AppLayout>
      <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Page header */}
        <Box component="header">
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "1.5rem", md: "1.875rem" },
              letterSpacing: "0.05em",
              fontWeight: 400,
            }}
          >
            Fluxo de Caixa
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Histórico de compras e pendências de pagamento.
          </Typography>
        </Box>

        {/* Summary cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 1.5,
          }}
        >
          <SummaryCard label="Recebido" value={totals.paid} tone="ok" />
          <SummaryCard label="Pendente" value={totals.pending} tone="warn" />
          <SummaryCard label="Atrasado" value={totals.overdue} tone="danger" />
        </Box>

        {/* Mobile cards */}
        <Box
          component="ul"
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 1.5,
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {sales.map((sale) => (
            <Box
              key={sale.id}
              component="li"
              sx={{
                borderRadius: 2,
                border: `1px solid ${COLORS.border}`,
                bgcolor: "background.paper",
                p: 2,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Compra #{sale.id}
                  </Typography>
                  <Typography sx={{ fontSize: "1rem", mt: 0.25 }}>{sale.customer}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: "block" }}>
                    {sale.clothingName}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontSize: "0.875rem" }}>{formatBRL(sale.price)}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDateBR(sale.purchaseDate)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 1.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <StatusBadge status={sale.status} />
                <Box
                  component="span"
                  sx={{ fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Typography component="span" variant="caption" color="text.secondary">
                    Limite:
                  </Typography>
                  <DeadlineBadge iso={sale.paymentDeadline} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Desktop table */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            borderRadius: 2,
            border: `1px solid ${COLORS.border}`,
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 80 }}>Código</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Roupa</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell>Data da compra</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data limite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      #{sale.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{sale.customer}</TableCell>
                  <TableCell>{sale.clothingName}</TableCell>
                  <TableCell align="right">{formatBRL(sale.price)}</TableCell>
                  <TableCell>{formatDateBR(sale.purchaseDate)}</TableCell>
                  <TableCell>
                    <StatusBadge status={sale.status} />
                  </TableCell>
                  <TableCell>
                    <DeadlineBadge iso={sale.paymentDeadline} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </AppLayout>
  );
};
