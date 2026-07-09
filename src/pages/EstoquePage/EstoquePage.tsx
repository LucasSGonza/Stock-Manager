import { useMemo, useState } from "react";
import {
  Box,
  Button,
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
import { ClothingModal } from "@/components/ClothingModal";
import { mockedClothes, formatBRL } from "@/util";
import type { DClothing } from "@/types";
import { COLORS } from "@/util";
import { DialogConfirmDelete } from "@/components";

export function EstoquePage() {
  const [items, setItems] = useState<DClothing[]>(mockedClothes);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<DClothing | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        String(i.id).includes(q),
    );
  }, [items, query]);

  const handleOpenCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: DClothing) => {
    setEditing(item);
    setModalOpen(true);
  };

  const handleSubmit = (data: Omit<DClothing, "id"> & { id?: number }) => {
    if (data.id != null) {
      setItems((prev) =>
        prev.map((i) =>
          i.id === data.id ? { ...i, ...data, id: data.id! } : i,
        ),
      );
    } else {
      const nextId = items.reduce((m, i) => Math.max(m, i.id), 1000) + 1;
      setItems((prev) => [...prev, { ...data, id: nextId }]);
    }
  };

  const handleDelete = () => {
    if (confirmId == null) return;
    setItems((prev) => prev.filter((i) => i.id !== confirmId));
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
            Estoque
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {items.length}{" "}
            {items.length === 1 ? "peça registrada" : "peças registradas"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            placeholder="Buscar por roupa, categoria ou código…"
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
            Nova roupa
          </Button>
        </Box>
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
        {filtered.map((item) => (
          <Box
            key={item.id}
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
                  #{item.id}
                </Typography>
                <Typography sx={{ fontSize: "1rem", mt: 0.25 }}>
                  {item.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 0.5, display: "block" }}
                >
                  {item.category} · Tam {item.size}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "0.875rem" }}>
                  {formatBRL(item.price)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Qtd: {item.quantity}
                </Typography>
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
                onClick={() => handleOpenEdit(item)}
              >
                Editar
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                startIcon={<Icon fontSize="medium">delete</Icon>}
                onClick={() => setConfirmId(item.id)}
              >
                Excluir
              </Button>
            </Box>
          </Box>
        ))}
        {filtered.length === 0 && (
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
              <TableCell>Roupa</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Tamanho</TableCell>
              <TableCell align="right">Qtd</TableCell>
              <TableCell align="right">Preço</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Typography variant="caption" color="text.secondary">
                    #{item.id}
                  </Typography>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{formatBRL(item.price)}</TableCell>
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
                      onClick={() => handleOpenEdit(item)}
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
                      onClick={() => setConfirmId(item.id)}
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
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nenhuma peça encontrada.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Clothing modal */}
      <ClothingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        isEdit={editing}
        onSubmit={handleSubmit}
      />

      {/* Delete confirmation */}
      <DialogConfirmDelete
        type="clothing"
        confirmId={confirmId}
        setConfirmId={setConfirmId}
        handleDelete={handleDelete}
      />
    </Box>
  );
}
