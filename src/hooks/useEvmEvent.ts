// hooks/useEvmEvent.ts

import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { ethers } from "ethers";
import { useProvider } from "wagmi";

type EvmEventOptions = {
  chainId: number;
  contractAddress: string;
  abi: any;
  eventName: string;
  pollingInterval?: number;
};

export const useEvmEvent = ({
  chainId,
  contractAddress,
  abi,
  eventName,
  pollingInterval = 5000,
}: EvmEventOptions): UseQueryResult<ethers.utils.LogDescription[], Error> => {
  const provider = useProvider({ chainId });
  const [eventList, setEventList] = useState<ethers.utils.LogDescription[]>([]);

  const fetchEvent = async () => {
    if (!provider) return;

    const contract = new ethers.Contract(contractAddress, abi, provider);
    const filter = contract.filters[eventName]();
    const eventLogs = await provider.getLogs({
      ...filter,
      fromBlock: 0,
      toBlock: "latest",
    });

    const parsedEvents = eventLogs.map((log: any) => contract.interface.parseLog(log));
    setEventList(parsedEvents);
  };

  return useQuery(`evmEvent_${eventName}`, fetchEvent, {
    refetchInterval: pollingInterval,
    onError: (error) => console.error("Error fetching event:", error),
    enabled: !!provider, // Only fetch events if the provider is available
  });
};
