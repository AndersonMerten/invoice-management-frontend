import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useState } from "react";

interface CloseDayModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (pix: number, card: number, others: number) => void;
  isLoading?: boolean;
}

const CloseDayModal: React.FC<CloseDayModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
  isLoading
}) => {
  const [pix, setPix] = useState("");
  const [card, setCard] = useState("");
  const [other, setOther] = useState("");

  const handleSave = () => {
    onSave(Number(pix), Number(card), Number(other));
    setPix("");
    setCard("");
    setOther("");
  };

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      aria-labelledby="close-day-modal-title"
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
          border: "1px solid #f44336", // Borda vermelha
        }}
      >
        {/* Header com botão de fechar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
            borderBottom: '1px solid rgba(244, 67, 54, 0.3)'
          }}
        >
          <Typography
            id="close-day-modal-title"
            variant="h6"
            component="h2"
            fontWeight="500"
            sx={{ color: "#f44336", m: 0 }}
          >
            Fechamento do dia
          </Typography>
          <IconButton
            onClick={onRequestClose}
            sx={{ color: "#f44336", '&:hover': { color: "#ef5350" } }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Form */}
        <Box sx={{ p: 4 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Recebimento via maquininha"
              type="number"
              value={card}
              onChange={(e) => setCard(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#2d2d2d',
                  color: 'white',
                  '& fieldset': { borderColor: '#555' },
                  '&:hover fieldset': { borderColor: '#f44336' },
                  '&.Mui-focused fieldset': { borderColor: '#f44336' },
                },
                '& .MuiInputLabel-root': { color: '#f44336' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#f44336' },
              }}
            />
            <TextField
              fullWidth
              label="Recebimento via PIX"
              type="number"
              value={pix}
              onChange={(e) => setPix(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#2d2d2d',
                  color: 'white',
                  '& fieldset': { borderColor: '#555' },
                  '&:hover fieldset': { borderColor: '#f44336' },
                  '&.Mui-focused fieldset': { borderColor: '#f44336' },
                },
                '& .MuiInputLabel-root': { color: '#f44336' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#f44336' },
              }}
            />
            <TextField
              fullWidth
              label="Outros recebimentos"
              type="number"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#2d2d2d',
                  color: 'white',
                  '& fieldset': { borderColor: '#555' },
                  '&:hover fieldset': { borderColor: '#f44336' },
                  '&.Mui-focused fieldset': { borderColor: '#f44336' },
                },
                '& .MuiInputLabel-root': { color: '#f44336' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#f44336' },
              }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ pt: 2 }}>
              <Button 
                variant="contained" 
                onClick={handleSave}
                disabled={isLoading}
                sx={{
                  backgroundColor: '#f44336',
                  '&:hover': { backgroundColor: '#d32f2f' }
                }}
              >
                {isLoading ? "Salvando fechamento..." : "Salvar"}
              </Button>
              <Button 
                variant="outlined" 
                onClick={onRequestClose}
                sx={{
                  borderColor: '#f44336',
                  color: '#f44336',
                  '&:hover': { 
                    borderColor: '#d32f2f', 
                    backgroundColor: 'rgba(244, 67, 54, 0.1)' 
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

export default CloseDayModal;