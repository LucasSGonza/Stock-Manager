import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import type { DClothing } from "@/types";

interface ClothingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: DClothing | null;
  onSubmit: (data: Omit<DClothing, "id"> & { id?: number }) => void;
}

const emptyForm = { name: "", category: "", size: "", quantity: 0, price: 0 };

interface ClothingFormProps {
  isEdit?: DClothing | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<DClothing, "id"> & { id?: number }) => void;
}

function ClothingForm({ isEdit, onOpenChange, onSubmit }: ClothingFormProps) {
  const [form, setForm] = useState(
    isEdit
      ? {
          name: isEdit.name,
          category: isEdit.category,
          size: isEdit.size,
          quantity: isEdit.quantity,
          price: isEdit.price,
        }
      : emptyForm
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({ ...form, id: isEdit?.id });
    onOpenChange(false);
  };

  return (
    <>
      <DialogTitle sx={{ pb: 0.5 }}>
        <Typography variant="body1" sx={{ fontFamily: "inherit", fontWeight: 600 }}>
          {isEdit ? "Editar roupa" : "Nova roupa"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: "0.8125rem" }}>
          Preencha as informações do item de estoque.
        </Typography>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Vestido floral midi"
              required
              fullWidth
              size="small"
            />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
              <TextField
                label="Categoria"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Vestido"
                fullWidth
                size="small"
              />
              <TextField
                label="Tamanho"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                placeholder="M"
                fullWidth
                size="small"
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
              <TextField
                label="Quantidade"
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                slotProps={{ htmlInput: { min: 0 } }}
                fullWidth
                size="small"
              />
              <TextField
                label="Preço (R$)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                fullWidth
                size="small"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button type="button" variant="outlined" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            {isEdit ? "Salvar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Box>
    </>
  );
}

export function ClothingModal({ open, onOpenChange, isEdit, onSubmit }: ClothingModalProps) {
  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} maxWidth="xs" fullWidth>
      <ClothingForm
        key={isEdit?.id ?? "new"}
        isEdit={isEdit}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
