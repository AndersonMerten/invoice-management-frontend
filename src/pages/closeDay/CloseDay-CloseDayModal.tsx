import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface CloseDayModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (pix: number, card: number, others: number) => void;
}

const CloseDayModal: React.FC<CloseDayModalProps> = ({
  isOpen,
  onRequestClose,
  onSave,
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
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="close-day-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Fechar o dia
        </Typography>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Recebimento via maquininha"
            type="number"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Recebimento via PIX"
            type="number"
            value={pix}
            onChange={(e) => setPix(e.target.value)}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Outros recebimentos"
            type="number"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            variant="outlined"
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Salvar fechamento
            </Button>
            <Button variant="outlined" onClick={onRequestClose}>
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CloseDayModal;
