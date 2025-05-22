import { Paper, Skeleton, Typography } from "@mui/material";

interface HeaderProps {
  saldo: number;
  isLoading?: boolean;
}

const Header = ({ saldo, isLoading = false }: HeaderProps) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        backgroundColor: saldo >= 0 ? "primary.dark" : "secondary.dark",
        color: "white",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" component="h1" gutterBottom>
        Saldo Atual
      </Typography>
      {isLoading ? (
        <Skeleton
          variant="rounded"
          width="100%"
          animation="wave"
          sx={{ height: 70 }}
        />
      ) : (
        <Typography variant="h3" component="h2">
          R$ {saldo.toFixed(2)}
        </Typography>
      )}
    </Paper>
  );
};

export default Header;
