import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

interface InvoiceModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSave: (clientName: string, value: number) => void;
}

const InvoiceModal = ({
  isOpen = false,
  onClose,
  onSave,
}: InvoiceModalProps) => {
  const [clientName, setClientName] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");

  const handleSave = () => {
    const value = parseFloat(invoiceValue);
    if (!isNaN(value) && clientName) {
      onSave(clientName, value);
      setClientName("");
      setInvoiceValue("");
      onClose();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="invoice-modal-title"
      sx={{ backdropFilter: "blur(5px)" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="invoice-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Lançar Nota Fiscal
        </Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nome do Cliente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Valor da Nota"
            type="number"
            value={invoiceValue}
            onChange={(e) => setInvoiceValue(e.target.value)}
            variant="outlined"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Salvar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;
