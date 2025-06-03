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
import { Balance } from "../../api/types/balance";
import dayjs from "dayjs";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface BalanceListProps {
  balances: Balance[];
  isFetching: boolean;
}

const BalanceList: React.FC<BalanceListProps> = ({
  balances,
  isFetching,
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
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
        Fechamento dos meses anteriores
        {open ? <ExpandLess sx={{ ml: 1 }} /> : <ExpandMore sx={{ ml: 1 }} />}
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {balances.map((balance, index) => (
            <React.Fragment key={balance.id}>
              <ListItem>
                {isFetching ? (
                  <ListItemText
                    primary={<Skeleton variant="text" width="40%" />}
                    secondary={<Skeleton variant="text" width="20%" />}
                  />
                ) : (
                  <ListItemText
                    primary={`${dayjs(`${balance.year}-${balance.month-1}-01`)
                      .locale("pt-br")
                      .format("MMMM")} de ${balance.year}`}
                    secondary={`R$ ${balance.value.toFixed(2)}`}
                  />
                )}
              </ListItem>
              {index < balances.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
};

export default BalanceList;
