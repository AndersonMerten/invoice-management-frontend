import { Button, Container, Paper, Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { CashUpApi } from "../../api/cashupApi";
import { InvoiceApi } from "../../api/invoiceApi";
import { CashUp } from "../../api/types/cashup";
import { Invoice } from "../../api/types/invoice";
import CloseDayList from "./CloseDay-CloseDayList";
import CloseDayModal from "./CloseDay-CloseDayModal";
import Header from "./CloseDay-Header";
import InvoiceList from "./CloseDay-InvoiceList";
import InvoiceModal from "./CloseDay-InvoiceModal";

const CloseDay = () => {
  const [saldo, setSaldo] = useState(0);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [closeDays, setCloseDays] = useState<CashUp[]>([]);
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [isCloseDayModalOpen, setCloseDayModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setisFetching] = useState(false);

  const fetchData = async () => {
    setSaldo(0);
    try {
      setisFetching(true);
      // faz o get de invoices, saldo positivo
      const response = await InvoiceApi.getAll();
      setInvoices(response);
      response.map((invoice) => {
        setSaldo((prevSaldo) => prevSaldo + invoice.value);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }

    try {
      // faz o get de cashupos, saldo negativo
      const response = await CashUpApi.getAll();
      setCloseDays(response);
      response.map((cashup) => {
        const totalAmount = cashup.card + cashup.pix + cashup.others;
        setSaldo((prevSaldo) => prevSaldo - totalAmount);
      });
      setisFetching(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddInvoice = async (clientName: string, value: number) => {
    try {
      const newInvoice: Invoice = {
        client_name: clientName,
        value: value,
      };
      const response: Invoice = await InvoiceApi.create(newInvoice);
      console.log("Fatura criada:", response);
      setInvoices((prevInvoices) => [...prevInvoices, response]);
      setSaldo((prevSaldo) => prevSaldo + value);
      setInvoiceModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar fatura:", err);
    }
  };

  const handleCloseDay = async (pix: number, card: number, others: number) => {
    try {
      const newCloseDay: CashUp = {
        date: dayjs(new Date())
          .locale("pt-br")
          .format("DD[ de ]MMMM[ de ]YYYY"),
        pix: pix,
        card: card,
        others: others,
      };
      const response = await CashUpApi.create(newCloseDay);
      setCloseDays((prevCloseDays) => [...prevCloseDays, response]);
      setSaldo((prevSaldo) => prevSaldo - (pix + card + others));
      setCloseDayModalOpen(false);
      console.log("Fechamento do dia criado:", response);
    } catch (err) {
      console.error("Erro ao criar fatura:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Header saldo={saldo} isLoading={isFetching} />
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setInvoiceModalOpen(true)}
          >
            Lançar Nota Fiscal
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setCloseDayModalOpen(true)}
          >
            Fechar o Dia
          </Button>
        </Stack>
      </Paper>

      <Stack spacing={3}>
        {invoices ? (
          <InvoiceList invoices={invoices} onDelete={fetchData} />
        ) : (
          <div>Carregando faturas...</div>
        )}
        {closeDays ? (
          <CloseDayList closeDays={closeDays} onDelete={fetchData} />
        ) : (
          <div>Carregando fechamentos do dia</div>
        )}
      </Stack>

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        onSave={handleAddInvoice}
      />
      <CloseDayModal
        isOpen={isCloseDayModalOpen}
        onRequestClose={() => setCloseDayModalOpen(false)}
        onSave={handleCloseDay}
      />
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default CloseDay;
