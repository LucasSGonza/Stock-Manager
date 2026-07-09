import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { SaleModal } from "@/components/SaleModal";
import {
  salesInfos,
  formatBRL,
  getDeadlineLevel,
  getDeadlineColors,
} from "@/util";
import type { DSale, SaleStatus } from "@/types";
import { COLORS } from "@/util";
import { DialogConfirmDelete } from "@/components";

const STATUS_STYLES: Record<
  SaleStatus,
  { bgcolor: string; color: string; border: string }
> = {
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

function StatusBadge({ status = "Pendente" }: { status?: SaleStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <Chip
      label={status ?? "Indefinido"}
      size="small"
      variant="outlined"
      sx={{
        bgcolor: s.bgcolor,
        color: s.color,
        borderColor: s.border,
        fontWeight: 600,
        fontSize: "0.75rem",
        width: "70px",
      }}
    />
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function DeadlineBadge({ paymentDeadline, status }: { paymentDeadline: string; status?: SaleStatus }) {
  const level = getDeadlineLevel(paymentDeadline, status);
  const { bgcolor, color } = getDeadlineColors(level);
  return (
    <Chip
      size="small"
      label={formatDate(paymentDeadline)}
      variant="outlined"
      sx={{
        bgcolor,
        color,
        border: `${COLORS.primary}4d`,
        fontSize: "0.75rem",
        fontWeight: 500,
      }}
    />
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
      <Typography sx={{ fontSize: "1.25rem", mt: 0.5, fontFamily: "inherit" }}>
        {formatBRL(value)}
      </Typography>
    </Box>
  );
}

export function CaixaPage() {
  const [sales, setSales] = useState<DSale[]>(salesInfos);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DSale | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const filteredSales = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return sales;
    return sales.filter(
      (i) =>
        i.customerName.toLowerCase().includes(q) ||
        i.clothingName.toLowerCase().includes(q) ||
        String(i.id).includes(q),
    );
  }, [sales, query]);

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

  const handleOpenCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (sale: DSale) => {
    setEditing(sale);
    setModalOpen(true);
  };

  const handleSubmit = (data: Omit<DSale, "id"> & { id?: number }) => {
    if (data.id != null) {
      setSales((prev) =>
        prev.map((s) =>
          s.id === data.id ? { ...s, ...data, id: data.id! } : s,
        ),
      );
    } else {
      const nextId = sales.reduce((m, s) => Math.max(m, s.id), 5000) + 1;
      setSales((prev) => [...prev, { ...data, id: nextId }]);
    }
  };

  const handleDelete = () => {
    if (confirmId == null) return;
    setSales((prev) => prev.filter((s) => s.id !== confirmId));
    setConfirmId(null);
  };

  return (
    <Box
      component="section"
      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
    >
      {/* Page header */}
      <Box
        component="header"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { md: "flex-end" },
          justifyContent: { md: "space-between" },
          gap: 1.5,
        }}
      >
        <Box>
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
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            placeholder="Buscar por cliente, roupa ou código…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            sx={{ width: { xs: "100%", md: 300 } }}
            slotProps={{ input: { sx: { bgcolor: "background.paper" } } }}
          />
          <Button
            variant="contained"
            startIcon={<Icon fontSize="medium">add</Icon>}
            onClick={handleOpenCreate}
            sx={{ flexShrink: 0 }}
          >
            Novo registro
          </Button>
        </Box>
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
        {filteredSales.map((sale) => (
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 1.5,
              }}
            >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Compra #{sale.id}
                </Typography>
                <Typography sx={{ fontSize: "1rem", mt: 0.25 }}>
                  {sale.customerName}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.25, display: "block" }}
                >
                  {sale.clothingName}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "0.875rem" }}>
                  {formatBRL(sale.price)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(sale.purchaseDate)}
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {sale.installmentsPaid}/{sale.installmentsTotal} parcelas
                </Typography>
                <Box
                  component="span"
                  sx={{
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    Limite:
                  </Typography>
                  <DeadlineBadge paymentDeadline={sale.paymentDeadline} status={sale.status} />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Button
                size="small"
                variant="outlined"
                startIcon={<Icon fontSize="medium">edit</Icon>}
                onClick={() => handleOpenEdit(sale)}
              >
                Editar
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<Icon fontSize="medium">delete</Icon>}
                onClick={() => setConfirmId(sale.id)}
              >
                Excluir
              </Button>
            </Box>
          </Box>
        ))}
        {filteredSales.length === 0 && (
          <Box component="li" sx={{ textAlign: "center", py: 5 }}>
            <Typography variant="body2" color="text.secondary">
              Nenhuma peça encontrada.
            </Typography>
          </Box>
        )}
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
              <TableCell align="center">Parcelas</TableCell>
              <TableCell>Data limite</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    #{sale.id}
                  </Typography>
                </TableCell>
                <TableCell>{sale.customerName}</TableCell>
                <TableCell>{sale.clothingName}</TableCell>
                <TableCell align="right">{formatBRL(sale.price)}</TableCell>
                <TableCell>{formatDate(sale.purchaseDate)}</TableCell>
                <TableCell>
                  <StatusBadge status={sale.status} />
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2">
                    {sale.installmentsPaid}/{sale.installmentsTotal}
                  </Typography>
                </TableCell>
                <TableCell>
                  <DeadlineBadge paymentDeadline={sale.paymentDeadline} status={sale.status} />
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 0.75,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(sale)}
                      sx={{
                        border: `1px solid ${COLORS.border}`,
                        borderRadius: 1,
                        p: 0.75,
                      }}
                    >
                      <Icon fontSize="medium">edit</Icon>
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setConfirmId(sale.id)}
                      sx={{
                        bgcolor: COLORS.statusDanger,
                        color: COLORS.statusDangerFg,
                        borderRadius: 1,
                        p: 0.75,
                        "&:hover": { bgcolor: "#e02020" },
                      }}
                    >
                      <Icon fontSize="medium">delete</Icon>
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {filteredSales.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nenhuma peça encontrada.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Sale modal */}
      <SaleModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        isEdit={editing}
        onSubmit={handleSubmit}
      />

      {/* Delete confirmation */}
      <DialogConfirmDelete
        type="sale"
        confirmId={confirmId}
        setConfirmId={setConfirmId}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
