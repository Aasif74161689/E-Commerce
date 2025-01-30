import React, { useEffect, useState } from "react";
import "./styles.css";

const filters = [
  { min: 0, max: 1000000000, label: "Please select" },
  { min: 0, max: 50, label: "0 - 50" },
  { min: 51, max: 100, label: "51 - 100" },
  { min: 101, max: 1000, label: "101 - 1000" },
];

const App = () => {
  const [data, setData] = useState([]);
  const [priceRange, setPriceRange] = useState(filters[0]);
  const [sortAscending, setSortAscending] = useState(true); // Initial sort order

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (event) => {
    const selectedRange = JSON.parse(event.target.value);
    setPriceRange(selectedRange);
  };

  const handleReset = () => {
    setPriceRange(filters[0]);
  };

  const handleAscending = () => {
    setSortAscending(!sortAscending); // Toggle sort order
  };

  const filteredData = data.filter(
    (product) =>
      product.price >= priceRange.min && product.price <= priceRange.max
  );

  // Sort the filtered data based on sortAscending state
  const sortedData = sortAscending
    ? filteredData.slice().sort((a, b) => a.price - b.price)
    : [...filteredData].sort((a, b) => b.price - a.price);

  return (
    <>
      <select name="" id="" onChange={handleSelect}>
        {filters.map((filter) => (
          <option key={filter.label} value={JSON.stringify(filter)}>
            {filter.label}
          </option>
        ))}
      </select>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleAscending}>
        {sortAscending ? "Ascending" : "Descending"}
      </button>
      <div className="cls">
        {sortedData.length > 0 ? (
          sortedData.map((item, index) => (
            <div className="cls1" key={index}>
              <p>{item.price}</p>
              <img src={item.image} height={"200px"} width={"200px"} alt="" />
            </div>
          ))
        ) : (
          <p>No products found in this price range.</p>
        )}
      </div>
    </>
  );
};

export default App;
