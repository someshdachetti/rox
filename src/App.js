import React, { useState, useEffect, createContext } from "react";
import { TransActionBoard } from "./Components/Transaction-Board";
import { SearchTransaction } from "./Components/Search-Transaction";
import { SelectTransaction } from "./Components/SelectTransaction";
import { Table } from "./Components/Table-Transaction";
import { PrevNxt } from "./Components/Prev-Nxt-Page";
import { BarCharts } from "./Components/Bar-Charts";
import "./App.css";

// Define months array
const listOfmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const TableDataContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [month, setMonth] = useState("");
  const [Price, setPrice] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [countSoldProducts, setCountSoldProducts] = useState(0);
  const [countNotSoldProducts, setCountNotSoldProducts] = useState(0);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    fetch("http://localhost:3005/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onChangeSearchFilter = (e) => {
    setSearchFilter(e.target.value);

    const filter = data.filter(
      (each) =>
        each.title.toLowerCase().includes(e.target.value.toLowerCase()) 
    );
    setFilteredData(filter);
  };

  const onChageMonth = (e) => {
    setMonth(e.target.value);
    const selectMonth = data.filter((each) => {
      const date = new Date(each.dateOfSale);
      return listOfmonths[date.getMonth()] === e.target.value;
    });
    setFilteredData(selectMonth);

    const totalPriceForMonth = selectMonth.reduce(
      (total, item) => total + item.price,
      0
    );
    setPrice(Math.ceil(totalPriceForMonth));

    // Count sold and not sold products for the selected month
    const countSold = selectMonth.filter((each) => each.sold === true);
    const countNotSold = selectMonth.filter(
      (each) => each.sold === false
    ).length;
    setCountSoldProducts(prev => prev +1);
    setCountNotSoldProducts((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <TableDataContext.Provider value={{ data: filteredData, setData }}>
          <center>
            <div className="bg-container">
              {/* Pass Price state as a prop to TransActionBoard */}
              <TransActionBoard
                Price={Price}
                countSoldProducts={countSoldProducts}
                countNotSoldProducts={countNotSoldProducts}
              />

              <div className="search-select-container">
                <SearchTransaction setSearchFilter={onChangeSearchFilter} />
                <SelectTransaction setMonth={onChageMonth} />
              </div>
              <Table />
              <PrevNxt />
              <BarCharts setMonth={month} chartData={filteredData} />
            </div>
          </center>
        </TableDataContext.Provider>
      </div>
    </>
  );
}

export default App;
