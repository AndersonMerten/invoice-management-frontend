import { CssBaseline, ThemeProvider } from "@mui/material";
import CloseDay from "./pages/closeDay/closeDay";
import "./styles/App.css";
import { theme } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CloseDay />
    </ThemeProvider>
  );
};

export default App;
