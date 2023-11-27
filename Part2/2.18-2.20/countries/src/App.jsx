import { useState, useEffect } from "react";
import SingleCountry from "./Components/SingleCountry";
import axios from "axios";

const App = () => {
  // const api_key = import.meta.env.VITE_SOME_KEY;
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const filtered = response.data.filter((country) => {
          return country.name.common
            .toLowerCase()
            .trim()
            .includes(search.trim().toLowerCase());
        });
        if (filtered.length <= 10 && filtered.length > 1) {
          setFilteredCountries(filtered);
          setMessage("");
        } else if (filtered.length == 1) {
          setMessage("");
          setFilteredCountries(filtered);
        } else {
          if (search !== "") {
            setMessage("Too many matches. Please narrow your search");
          } else {
            setMessage("Search Country");
          }
          setFilteredCountries([]);
        }
      });
  }, [search]);

  return (
    <div>
      <label htmlFor="inputCountry">Find Countries</label>
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        type="text"
        id="inputCountry"
      ></input>
      <div> {message}</div>
      <div>
        {filteredCountries.length > 1
          ? filteredCountries.map((country, index) => {
              return (
                <p key={index}>
                  {country.name.common}{" "}
                  <button
                    onClick={(e) => {
                      setFilteredCountries([country]);
                    }}
                  >
                    Show
                  </button>
                </p>
              );
            })
          : ""}
      </div>
      {filteredCountries.length == 1 && (
        <SingleCountry country={filteredCountries[0]}></SingleCountry>
      )}
    </div>
  );
};

export default App;
