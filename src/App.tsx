import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { getStockCurrentData, getStockDayChart } from "./effects";
import GlobalStyle from "./styles.global";
import { Tickers } from "./types";

function App() {
  const [selected, setSelected] = useState<Tickers>("GOOG");
  const [dayChart, setDayChart] = useState();
  const [currentData, setCurrentData] = useState();

  const getStockDataForTicker = async (ticker: Tickers) => {
    const dayChartResult = await getStockDayChart(ticker);
    const currentDataResult = await getStockCurrentData(ticker);
    setDayChart(dayChartResult);
    setCurrentData(currentDataResult);
  };

  useEffect(() => {
    getStockDataForTicker(selected);
  }, [selected]);

  console.log(dayChart, "historic data");
  console.log(currentData, "current price data");

  return (
    <>
      <GlobalStyle />
      <Layout title={selected}>
        <div>test</div>
      </Layout>
    </>
  );
}

export default App;
