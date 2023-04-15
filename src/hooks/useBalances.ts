import { useState, useEffect } from "react";
import { useBalance, Address } from "wagmi";
import { utils } from "ethers";

export interface BalanceConfig {
    name: string;
    chainId: number | undefined;
    token: Address | undefined;
  }  

const balanceConfigs: BalanceConfig[] = [
  { name: "ethETH", chainId: 1, token: undefined },
  {
    name: "ethUSDC",
    chainId: 1,
    token: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  { name: "polygonMATIC", chainId: 137, token: undefined },
  {
    name: "polygonUSDC",
    chainId: 137,
    token: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  },
];

export function useBalances(address: Address | undefined) {
  const [balances, setBalances] = useState<Record<string, string | undefined>>({});
  const [success, setSuccess] = useState<Record<string, boolean>>({});

  // Destructure the balanceConfigs array
  const [config1, config2, config3, config4] = balanceConfigs;

  // Call useBalance for each configuration
  const balanceHook1 = useBalance({
    address: address,
    chainId: config1.chainId,
    token: config1.token,
  });
  const balanceHook2 = useBalance({
    address: address,
    chainId: config2.chainId,
    token: config2.token,
  });
  const balanceHook3 = useBalance({
    address: address,
    chainId: config3.chainId,
    token: config3.token,
  });
  const balanceHook4 = useBalance({
    address: address,
    chainId: config4.chainId,
    token: config4.token,
  });

  // Create an array of balance hooks
  const balanceHooks = [balanceHook1, balanceHook2, balanceHook3, balanceHook4];

  useEffect(() => {
    balanceHooks.forEach(({ data, isSuccess }, index) => {
      const { name } = balanceConfigs[index];

      setBalances((prev) => ({
        ...prev,
        [name]: data ? utils.formatUnits(data.value, data.decimals) : undefined,
      }));
      setSuccess((prev) => ({ ...prev, [name]: isSuccess }));

      if (isSuccess) {
        console.log(name, balances[name]);
      }
    });
  }, [address, balanceHooks, balances]);

  return { balances, success };
}
