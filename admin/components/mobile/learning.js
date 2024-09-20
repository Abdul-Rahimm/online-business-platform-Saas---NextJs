// import { sortedByAge } from "@/services/functions";
import React, { useEffect, useState } from "react";
// People.sort((a, b) => a.age - b.age);
// People.sort((a, b) => a.name.localeCompare(b.name));
// const URL = "https://api.eatachi.co/api/country";
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

const Learning = ({ People }) => {
  const URL = "https://restcountries.com/v3.1/all?fields=name";
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);

  const [filter, setFilter] = useState("");
  const [countryName, setcountryName] = useState("");

  async function LoadData() {
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  useEffect(() => {
    LoadData();
  }, []);

  useEffect(() => {
    const cityURL = "https://restcountries.com/v3.1/name/{name}?fullText=true";
  }, []);

  return (
    <div>
      {/* <div className="bg-sky-300 m-3 text-center text-xl">
        <ul>
          {People.map((item, index) => (
            <li>{item.name + " " + item.age}</li>
          ))}
        </ul>
      </div> */}

      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        className="m-3 w-4/5 border-black border-solid border-2"
      />

      {/* <div className="bg-teal-200 text-center max-h-[500px] border-black border-solid border-2 m-3">
        <select onChange={(event) => setCountryId(event.target.value)}>
          {data.map((item, index) => (
            <option value={item.CountryId}>{item.Name}</option>
          ))}
        </select>

        <div className="border-black mt-3 border-t h-[400px] overflow-scroll">
          <ul>
            {cities
              .filter((item) => item.Name.toLowerCase().startsWith(filter))
              .map((city, index) => (
                <li key={index}>{city.Name}</li>
              ))}
          </ul>
        </div>
      </div> */}

      <div className="bg-teal-400">
        <label className="mr-4">Country</label>
        <select>
          {data
            .sort((a, b) => {
              return a.name.common.localeCompare(b.name.common);
            })
            .map((item, index) => (
              <option value={item.name.common}>{item.name.common}</option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Learning;
