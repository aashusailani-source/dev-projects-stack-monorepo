import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

function Coin() {
  const API_KEY = import.meta.env.VITE_CG_API_KEY;
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          headers: {
            accept: "application/json",
            "x-cg-pro-api-key": API_KEY,
          },
        }
      );

      console.log(response.data);
      setCoinData(response.data); // ✅ FIXED: Use response.data instead of response
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/history`,
        {
          headers: {
            accept: "application/json",
            "x-cg-pro-api-key": API_KEY,
          },
        }
      );
      console.log(response.data);
      setHistoricalData(response.data);
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);

  return (
    <div className="flex flex-col min-h-full min-w-full items-center justify-center">
      {coinData && historicalData ? (
        <>
          <img
            className="w-10"
            src={coinData.image?.large}
            alt={coinData.name}
          />
          <p>
            <b>
              {coinData.name} ({coinData.symbol?.toUpperCase()})
            </b>
          </p>
          <div>
            <LineChart historicalData={historicalData} />
          </div>
        </>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
}

export default Coin;
