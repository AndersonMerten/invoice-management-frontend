import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material"; // Adicione este import
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
          bgcolor: "#1e1e1e", // Fundo escuro
          boxShadow: 24,
          borderRadius: 2,
          border: "1px solid #4caf50", // Borda verde
        }}
      >
        {/* Header com botão de fechar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: '1px solid rgba(76, 175, 80, 0.3)'
          }}
        >
          <Typography
            id="invoice-modal-title"
            variant="h6"
            component="h2"
            fontWeight="500"
            sx={{ color: "#4caf50", m: 0 }}
          >
            Lançar Nota Fiscal
          </Typography>
          <IconButton
            onClick={onClose}
            sx={{ color: "#4caf50", '&:hover': { color: "#81c784" } }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Form */}
        <Box sx={{ p: 4 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nome do Cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#2d2d2d',
                  color: 'white',
                  '& fieldset': { borderColor: '#555' },
                  '&:hover fieldset': { borderColor: '#4caf50' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root': { color: '#4caf50' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
              }}
            />
            <TextField
              fullWidth
              label="Valor da Nota"
              type="number"
              value={invoiceValue}
              onChange={(e) => setInvoiceValue(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#2d2d2d',
                  color: 'white',
                  '& fieldset': { borderColor: '#555' },
                  '&:hover fieldset': { borderColor: '#4caf50' },
                  '&.Mui-focused fieldset': { borderColor: '#4caf50' },
                },
                '& .MuiInputLabel-root': { color: '#4caf50' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#4caf50' },
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleSave}
                sx={{
                  backgroundColor: '#4caf50',
                  '&:hover': { backgroundColor: '#45a049' }
                }}
              >
                Salvar Nota Fiscal
              </Button>
              <Button 
                variant="outlined" 
                onClick={onClose}
                sx={{
                  borderColor: '#4caf50',
                  color: '#4caf50',
                  '&:hover': { 
                    borderColor: '#45a049', 
                    backgroundColor: 'rgba(76, 175, 80, 0.1)' 
                  }
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default InvoiceModal;