import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CashUpApi } from "../../api/cashupApi";
import { CashUp } from "../../api/types/cashup";

interface CloseDayListProps {
  closeDays: CashUp[];
  onDelete: () => void;
  isFetching: boolean;
}

const CloseDayList: React.FC<CloseDayListProps> = ({
  closeDays,
  onDelete,
  isFetching,
}) => {
  const [idDeleting, setIdDeleting] = useState<Number | null>(null);

  const handleDelete = async (closeDay: CashUp) => {
    if (closeDay.id) {
      try {
        setIdDeleting(closeDay.id);
        await CashUpApi.delete(String(closeDay.id));
        onDelete();
      } catch (err) {
        console.error("Erro ao deletar o fechamento do dia:", err);
      }
      setIdDeleting(null);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Fechamentos do Dia
      </Typography>
      <List>
        {closeDays.map((closeDay, index) => (
          <React.Fragment key={closeDay.id}>
            <ListItem>
              {idDeleting === closeDay.id ? (
                <ListItemText
                  primary={<Skeleton variant="text" width="40%" />}
                  secondary={<Skeleton variant="text" width="20%" />}
                />
              ) : (
                <>
                  <ListItemText
                    primary={closeDay.date}
                    secondary={
                      <Box component="span">
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          display="block"
                        >
                          Maquininha: R$ {closeDay.card.toFixed(2)} | PIX: R${" "}
                          {closeDay.pix.toFixed(2)} | Outros: R$
                          {closeDay.others.toFixed(2)}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body1"
                          color="secondary.light"
                          display="block"
                        >
                          Total: R${" "}
                          {(
                            closeDay.pix +
                            closeDay.card +
                            closeDay.others
                          ).toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(closeDay)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </ListItem>
            {index < closeDays.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default CloseDayList;
