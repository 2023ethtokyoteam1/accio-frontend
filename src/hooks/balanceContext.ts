import React from "react";

interface BalanceContextType {
  balances: Record<string, number>;
  setBalances: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  totalBalance: number;
  setTotalBalance: React.Dispatch<React.SetStateAction<number>>;
}

export const balanceContext = React.createContext<BalanceContextType>({
  balances: {},
  setBalances: () => {},
  totalBalance: 0,
  setTotalBalance: () => {},
});
