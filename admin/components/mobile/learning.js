// import { sortedByAge } from "@/services/functions";
import React, { useEffect, useState } from "react";
// People.sort((a, b) => a.age - b.age);
// People.sort((a, b) => a.name.localeCompare(b.name));

const Learning = ({ People }) => {
  const URL = "https://api.eatachi.co/api/country";
  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);

  const [filter, setFilter] = useState("");
  const [countryId, setCountryId] = useState("");

  async function LoadData() {
    await fetch(URL)
      .then((response) => response.json())
      .then((data) => setData(data));
  }

  useEffect(() => {
    LoadData();
  }, []);

  useEffect(() => {
    const URL2 = `https://api.eatachi.co/api/city/bycountry/${countryId}`;

    if (countryId !== "") {
      fetch(URL2)
        .then((response) => response.json())
        .then((cities) => setCities(cities));
    }
  }, [countryId]);

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

      <div className="bg-teal-200 text-center max-h-[500px] border-black border-solid border-2 m-3">
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
      </div>
    </div>
  );
};

export default Learning;
