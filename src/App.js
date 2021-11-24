import { useEffect, useState } from "react";
import ButtonContainer from "./components/ButtonContainer";
import SheetContainer from "./components/SheetContainer";
import { getStockCurrentData, getStockDayChart } from "./effects";
import { constructRows } from "./processingStockData";
function App() {
  const [selected, setSelected] = useState("GOOG");
  const [rows, setRows] = useState([[]]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const stocksToFollow = ["GOOG", "AMZN", "AAPL", "NFLX", "MSFT"];

  const getStockDataForTicker = async (selected) => {
    setLoading(true);
    if (
      localStorage.getItem(selected) === null ||
      Object.keys(localStorage.getItem(selected)).length === 0
    ) {
      console.log("retrieved from API");
      const dayChartResult = await getStockDayChart(selected);
      const currentDataResult = await getStockCurrentData(selected);
      let stockDataObject = {
        day: dayChartResult,
        current: currentDataResult,
      };
      localStorage.setItem(selected, JSON.stringify(stockDataObject));
      constructRows(stockDataObject, setRows, setFetchError);
    } else {
      console.log("retrieved from LocalStorage");
      const result = localStorage.getItem(selected);
      constructRows(JSON.parse(result), setRows, setFetchError);
    }
    setLoading(false);
  };

  const reload = () => {
    localStorage.removeItem(selected);
    getStockDataForTicker(selected);
  };

  useEffect(() => {
    getStockDataForTicker(selected);
  }, [selected]);

  const headers = ["Day", "Price", " ", "%", "Volume"];

  return (
    <div>
      <ButtonContainer
        setSelected={setSelected}
        stocksToFollow={stocksToFollow}
        selected={selected}
        reload={reload}
      />
      {loading ? (
        <div className="loader" />
      ) : (
        <SheetContainer headers={headers} rows={fetchError ? [[]] : rows} />
      )}
    </div>
  );
}

export default App;
