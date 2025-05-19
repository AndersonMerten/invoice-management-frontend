import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4caf50", // Verde para entradas
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#fff", // cor das letras
    },
    secondary: {
      main: "#f44336", // Vermelho para saídas
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff", //cor das letras
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});
