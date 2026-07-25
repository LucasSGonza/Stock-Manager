import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface DialogConfirmDeleteProps {
  type: "clothing" | "sale";
  confirmId: number | null;
  setConfirmId: (id: number | null) => void;
  handleDelete: () => void;
}

export function DialogConfirmDelete({
  type,
  confirmId,
  setConfirmId,
  handleDelete,
}: DialogConfirmDeleteProps) {
  const dialogTitle =
    type === "clothing" ? "Excluir esta peça?" : "Excluir esta venda?";
  const dialogContent =
    type === "clothing"
      ? "A peça será removida do estoque. Esta ação não pode ser desfeita."
      : "A venda será removida do registro. Esta ação não pode ser desfeita.";

  return (
    <Dialog
      open={confirmId !== null}
      onClose={() => setConfirmId(null)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogContent}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button variant="outlined" onClick={() => setConfirmId(null)}>
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
