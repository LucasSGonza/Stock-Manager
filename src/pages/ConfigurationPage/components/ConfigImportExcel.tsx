import { AppSnackbar, ContentArea } from "@/components";
import { COLORS } from "@/util";
import { Box, Icon, Typography } from "@mui/material";
import { useRef, useState } from "react";

const ACCEPTED_EXTENSION = ".xlsx";
const ACCEPTED_MIME_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const INVALID_FILE_MESSAGE = "Apenas arquivos Excel (.xlsx) são aceitos.";

function isValidExcelFile(file: File): boolean {
  const hasValidExtension = file.name
    .toLowerCase()
    .endsWith(ACCEPTED_EXTENSION);
  const hasValidMimeType = !file.type || file.type === ACCEPTED_MIME_TYPE;
  return hasValidExtension && hasValidMimeType;
}

interface ConfigImportExcelProps {
  visible: boolean;
}

export function ConfigImportExcel({ visible = false }: ConfigImportExcelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleFile = (file: File) => {
    if (!isValidExcelFile(file)) {
      setSelectedFileName(null);
      setErrorOpen(true);
      return;
    }
    setSelectedFileName(file.name);
  };

  const handleClickDropzone = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    visible && (
      <ContentArea
        title="Importação"
        description="Importe registros de estoque e de caixa a partir de uma planilha."
        children={
          <Box>
            <Box
              onClick={handleClickDropzone}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              sx={{
                border: `1px dashed ${isDragging ? COLORS.primary : COLORS.border}`,
                borderRadius: 2,
                bgcolor: isDragging ? `${COLORS.primary}0d` : "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                py: { xs: 5, md: 7 },
                px: 2,
                cursor: "pointer",
                transition: "background-color 0.15s, border-color 0.15s",
              }}
            >
              <Icon sx={{ fontSize: 40, color: "text.secondary" }}>upload</Icon>
              <Typography sx={{ fontSize: "0.9375rem", textAlign: "center" }}>
                Arraste um arquivo ou selecione do seu dispositivo
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Formato aceito: XLSX
              </Typography>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept={`${ACCEPTED_EXTENSION},${ACCEPTED_MIME_TYPE}`}
                onChange={handleFileInputChange}
              />
            </Box>

            {selectedFileName && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Arquivo selecionado: {selectedFileName}
              </Typography>
            )}
            <AppSnackbar
              open={errorOpen}
              message={INVALID_FILE_MESSAGE}
              severity="error"
              onClose={handleCloseError}
            />
          </Box>
        }
      />
    )
  );
}
