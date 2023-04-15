import { useState, useEffect } from "react";
import axios from "axios";
interface QuoteData {
  data: any;
  loading: boolean;
  error: Error | null;
}

const useQuote = (fromTokenAddress: string, toTokenAddress: string, amount: string, chainId: number): QuoteData => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // TEST DATA
      if (chainId == 59140) {
        chainId = 1;
        if (fromTokenAddress == "0x964FF70695da981027c81020B1c58d833D49A640") {
          fromTokenAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
        }
        toTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
      }

      try {
        const tokenUri = encodeURIComponent(
          `https://api.1inch.io/v5.0/${chainId}/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}`
        );
        const proxyUrl = `/api/1inch?tokenUri=${tokenUri}`;
        const response = await axios.get(proxyUrl);
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Error fetching data");
        }

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [fromTokenAddress, toTokenAddress, amount, chainId]);

  return { data, loading, error };
};

export default useQuote;
