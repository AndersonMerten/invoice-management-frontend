import DeleteIcon from "@mui/icons-material/Delete";
import {
  Collapse,
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
import { InvoiceApi } from "../../api/invoiceApi";
import { Invoice } from "../../api/types/invoice";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface InvoiceListProps {
  invoices: Invoice[];
  onDelete: () => void;
  isFetching: boolean;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  onDelete,
  isFetching,
}) => {
  const [open, setOpen] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = async (invoice: Invoice) => {
    if (invoice.id) {
      try {
        setDeletingId(invoice.id);
        await InvoiceApi.delete(String(invoice.id));
        console.log(
          "Nota fiscal em nome de " +
            invoice.client_name +
            " foi deletada com sucesso!"
        );
        onDelete();
      } catch (err) {
        console.error("Erro ao deletar a nota fiscal:", err);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        onClick={handleClick}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        Notas Fiscais Lançadas
        {open ? <ExpandLess sx={{ ml: 1 }} /> : <ExpandMore sx={{ ml: 1 }} />}
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {invoices.map((invoice, index) => (
            <React.Fragment key={invoice.id}>
              <ListItem>
                {deletingId === invoice.id || isFetching ? (
                  <ListItemText
                    primary={<Skeleton variant="text" width="40%" />}
                    secondary={<Skeleton variant="text" width="20%" />}
                  />
                ) : (
                  <ListItemText
                    primary={invoice.client_name}
                    secondary={`R$ ${invoice.value.toFixed(2)}`}
                  />
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(invoice)}
                  disabled={deletingId === invoice.id || isFetching}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
              {index < invoices.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
};

export default InvoiceList;
