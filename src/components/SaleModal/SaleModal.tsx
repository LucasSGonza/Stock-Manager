import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { DSale } from "@/types";
import { useAppSelector } from "@/store/hooks";
import { selectStockList } from "@/store/stock/stockSlice";

interface SaleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: DSale | null;
  onSubmit: (data: Omit<DSale, "id"> & { id?: number }) => void;
}

const emptyForm: Omit<DSale, "id"> = {
  customerName: "",
  clothingName: "",
  price: 0,
  purchaseDate: "",
  paymentDeadline: "",
  installmentsPaid: 0,
  installmentsTotal: 0,
};

interface SaleFormProps {
  isEdit?: DSale | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<DSale, "id"> & { id?: number }) => void;
}

function SaleForm({ isEdit, onOpenChange, onSubmit }: SaleFormProps) {
  const items = useAppSelector(selectStockList);
  const [form, setForm] = useState<Omit<DSale, "id">>(
    isEdit
      ? {
          customerName: isEdit.customerName,
          clothingName: isEdit.clothingName,
          price: isEdit.price,
          purchaseDate: isEdit.purchaseDate,
          paymentDeadline: isEdit.paymentDeadline,
          installmentsPaid: isEdit.installmentsPaid,
          installmentsTotal: isEdit.installmentsTotal,
        }
      : emptyForm,
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (areFormFieldsValid(form) != true) return;
    onSubmit({ ...form, id: isEdit?.id });
    onOpenChange(false);
  };

  function areFormFieldsValid(form: Omit<DSale, "id">): boolean {
    //Validate required fields
    if (
      !form.customerName.trim() ||
      !form.clothingName.trim() ||
      form.installmentsTotal <= 0 ||
      form.price <= 0 ||
      !form.purchaseDate
    )
      return false;

    // Validate that installmentsPaid is not greater than installmentsTotal
    if (form.installmentsPaid > form.installmentsTotal) return false;

    if (form.paymentDeadline == null || form.paymentDeadline === "") {
      const purchaseDate = new Date(form.purchaseDate);
      const defaultDeadline = new Date(purchaseDate);
      defaultDeadline.setMonth(
        purchaseDate.getMonth() + form.installmentsTotal,
      );
      form.paymentDeadline = defaultDeadline.toISOString().split("T")[0];
    }

    // Validate that paymentDeadline is not before purchaseDate
    if (form.paymentDeadline && form.paymentDeadline < form.purchaseDate)
      return false;

    return true;
  }

  return (
    <>
      <DialogTitle sx={{ pb: 0.5 }}>
        <Typography
          variant="body1"
          sx={{ fontFamily: "inherit", fontWeight: 600 }}
        >
          {isEdit ? "Editar registro" : "Novo registro"}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, fontSize: "0.8125rem" }}
        >
          Preencha as informações do registro de pagamento.
        </Typography>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1.5 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Cliente"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
              placeholder="Nome da cliente"
              required
              fullWidth
              size="small"
            />
            <FormControl fullWidth size="small">
              <InputLabel id="clothing-select-label">Roupa comprada</InputLabel>
              <Select
                labelId="clothing-select-label"
                label="Roupa comprada"
                value={form.clothingName}
                onChange={(e) =>
                  setForm({ ...form, clothingName: e.target.value })
                }
                required
              >
                {
                  /* Add your clothing options here */
                  items.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            <TextField
              label="Preço (R$)"
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({ ...form, price: Number(e.target.value) })
              }
              slotProps={{ htmlInput: { min: 1, step: "0.01" } }}
              required
              fullWidth
              size="small"
            />
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <TextField
                label="Data da compra"
                type="date"
                value={form.purchaseDate}
                onChange={(e) =>
                  setForm({ ...form, purchaseDate: e.target.value })
                }
                slotProps={{ inputLabel: { shrink: true } }}
                required
                fullWidth
                size="small"
              />
              <TextField
                label="Data limite"
                type="date"
                value={form.paymentDeadline}
                onChange={(e) =>
                  setForm({ ...form, paymentDeadline: e.target.value })
                }
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
                size="small"
              />
            </Box>
            <Box
              sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}
            >
              <TextField
                label="Parcelas pagas"
                type="number"
                value={form.installmentsPaid}
                onChange={(e) =>
                  setForm({
                    ...form,
                    installmentsPaid: Math.max(0, Number(e.target.value)),
                  })
                }
                slotProps={{
                  htmlInput: { min: 0, max: form.installmentsTotal },
                }}
                fullWidth
                size="small"
              />
              <TextField
                label="Total de parcelas"
                type="number"
                value={form.installmentsTotal}
                onChange={(e) =>
                  setForm({
                    ...form,
                    installmentsTotal: Math.max(1, Number(e.target.value)),
                  })
                }
                slotProps={{ htmlInput: { min: 1 } }}
                fullWidth
                size="small"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => onOpenChange(false)}
          >
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

export function SaleModal({
  open,
  onOpenChange,
  isEdit,
  onSubmit,
}: SaleModalProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="xs"
      fullWidth
    >
      <SaleForm
        key={isEdit?.id ?? "new"}
        isEdit={isEdit}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
}
