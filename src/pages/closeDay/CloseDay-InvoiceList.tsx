import DeleteIcon from "@mui/icons-material/Delete";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { InvoiceApi } from "../../api/invoiceApi";
import { Invoice } from "../../api/types/invoice";

interface InvoiceListProps {
  invoices: Invoice[];
  onDelete: () => void;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, onDelete }) => {
  const handleDelete = async (invoice: Invoice) => {
    try {
      await InvoiceApi.delete(String(invoice.id));
      console.log(
        "Nota fiscal em nome de " +
          invoice.client_name +
          " foi deletada com sucesso!"
      );
      onDelete();
    } catch (err) {
      console.error("Erro ao deletar a nota fiscal:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Notas Fiscais Lançadas
      </Typography>
      <List>
        {invoices.map((invoice, index) => (
          <React.Fragment key={invoice.id}>
            <ListItem>
              <ListItemText
                primary={invoice.client_name}
                secondary={`R$ ${invoice.value.toFixed(2)}`}
              />
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(invoice)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
            {index < invoices.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default InvoiceList;
