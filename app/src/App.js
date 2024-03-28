import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const countries = await response.json();
        const formattedData = countries.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg,
        }));
        setFilteredData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = data.filter((country) =>
      country.name.toLowerCase().includes(searchQuery)
    );
    setFilteredData(filtered);
  };

  return (
    <div style={{display : "flex" , flexDirection : "column" , alignItems : "center"}}>
      <input onChange={(e) => handleSearch(e)} type="text" placeholder="Search for countries..." style={{width : "50rem", height : "40px" , margin : "1rem"}}/>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}
      >
        {filteredData.map((obj) => (
          <div
          className="countryCard"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
              border: "0.5px solid grey",
              borderRadius: "4px",
            }}
          >
            <img src={obj.flag} alt={obj.name} style={{ width: "100px" }} />
            <p>{obj.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
