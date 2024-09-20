import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const Dynamic = () => {
  const URL = "https://api.eatachi.co/api/country";
  // const URL2 = `https://api.eatachi.co/api/city/bycountry/${countryID}`;

  const [countryID, setCountryID] = useState(4);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.eatachi.co/api/city/bycountry/${countryID}`)
      .then((response) => response.json())
      .then((data) => setCities(data))
      .finally(setLoading(false));
  }, [countryID]);

  console.log(cities);

  return (
    <div>
      <label>Dynamic Countries | {countryID}</label>
      <select
        onChange={(event) => {
          setCountryID(event.target.value);
        }}
      >
        {countries.map((c, index) => {
          return (
            <option key={index} value={c.CountryId}>
              {c.Name}
            </option>
          );
        })}
      </select>

      <input
        className="mt-4"
        type="text"
        value={filter}
        onChange={(event) => {
          setFilter(event.target.value);
        }}
      />

      {loading && <p className="text-4xl">...Loading</p>}

      <div className="text-center">
        <h1>
          {"Cities " +
            cities.filter((c) => c.Name.toLowerCase().startsWith(filter))
              .length}
        </h1>
        {cities
          .filter((c) => c.Name.toLowerCase().startsWith(filter))
          .map((city, index) => (
            <p key={index} value={city.CityId}>
              {city.Name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default Dynamic;
