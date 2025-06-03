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
import BalanceList from "./CloseDay-BalanceList";
import { Balance } from "../../api/types/balance";
import { BalanceApi } from "../../api/balanceApi";

const CloseDay = () => {
  const [saldo, setSaldo] = useState(0);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [closeDays, setCloseDays] = useState<CashUp[]>([]);
  const [balances, setBalances] = useState<Balance[]>([]);
  const [handleError, setHandleError] = useState<String | null>(null);
  const [isInvoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [isCloseDayModalOpen, setCloseDayModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, setisFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const fetchData = async () => {
    setSaldo(0);
    setisFetching(true);
    try {// faz o get de invoices, saldo positivo
      const response = await InvoiceApi.getAll();
      setInvoices(response);
      response.map((invoice) => {
        setSaldo((prevSaldo) => prevSaldo + invoice.value);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }

    try {// faz o get de cashupos, saldo negativo
      const response = await CashUpApi.getAll();
      setCloseDays(response);
      response.map((cashup) => {
        const totalAmount = cashup.card + cashup.pix + cashup.others;
        setSaldo((prevSaldo) => prevSaldo - totalAmount);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }
    try {// faz o get de balances, saldo dos meses anteriores
      const response = await BalanceApi.getAll();
      setBalances(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    }

    setisFetching(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddInvoice = async (clientName: string, value: number) => {
    setIsLoading(true);
    try {
      const newInvoice: Invoice = {
        client_name: clientName,
        value: value,
      };
      if (value <= 0) {
        setHandleError("O valor da nota fiscal deve ser maior que zero.");
        setInvoiceModalOpen(false);
        return;
      }
      const response: Invoice = await InvoiceApi.create(newInvoice);
      console.log("Fatura criada:", response);
      setInvoices((prevInvoices) => [...prevInvoices, response]);
      setSaldo((prevSaldo) => prevSaldo + value);      
      setHandleError(null);
      setInvoiceModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar fatura:", err);
    }finally {
      setIsLoading(false);
    }
  };

  const handleCloseDay = async (pix: number, card: number, others: number) => {
    setIsLoading(true);
    try {
      const newCloseDay: CashUp = {
        date: dayjs(new Date())
          .locale("pt-br")
          .format("DD[ de ]MMMM[ de ]YYYY"),
        pix: pix,
        card: card,
        others: others,
      };
      if(pix+ card + others <= 0) {
        setHandleError("O valor total do fechamento deve ser maior que zero.");
        setCloseDayModalOpen(false);
        return;
      }
      const response = await CashUpApi.create(newCloseDay);
      setCloseDays((prevCloseDays) => [...prevCloseDays, response]);
      setSaldo((prevSaldo) => prevSaldo - (pix + card + others));      
      setHandleError(null);
      setCloseDayModalOpen(false);
    } catch (err) {
      console.error("Erro ao criar fatura:", err);
    }finally {
      setIsLoading(false);
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
      {handleError && (<Alert severity="error" onClose={() => setHandleError(null)} sx={{ mb: 2 }}>
        {handleError}
      </Alert>)}

      <Stack spacing={3}>
        {invoices ? (
          <InvoiceList
            invoices={invoices}
            onDelete={fetchData}
            isFetching={isFetching}
          />
        ) : (
          <div>Carregando faturas...</div>
        )}
        {closeDays ? (
          <CloseDayList
            closeDays={closeDays}
            onDelete={fetchData}
            isFetching={isFetching}
          />
        ) : (
          <div>Carregando fechamentos do dia</div>
        )}

        {balances ? (
          <BalanceList balances={balances} isFetching={isFetching} />
        ) : (
          <div>Carregando saldos dos meses anteriores...</div>
        )}
      </Stack>

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        onSave={handleAddInvoice}
        isLoading={isLoading}
      />
      <CloseDayModal
        isOpen={isCloseDayModalOpen}
        onRequestClose={() => setCloseDayModalOpen(false)}
        onSave={handleCloseDay}
        isLoading={isLoading}
      />
      {error && <Alert severity="error">{error}</Alert>}
    </Container>
  );
};

export default CloseDay;
