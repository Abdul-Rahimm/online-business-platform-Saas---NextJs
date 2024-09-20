// import { sortedByAge } from "@/services/functions";
import React, { useEffect, useState } from "react";
import ShowHideDiv from "@/components/mobile/showHideDiv";
import Image from "next/image";
// People.sort((a, b) => a.age - b.age);
// People.sort((a, b) => a.name.localeCompare(b.name));
// const URL = "https://api.eatachi.co/api/country";
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

const Learning = ({ People }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("Afghanistan");
  const [selectedCountryData, setSelectedCountryData] = useState([]);

  async function LoadAllCountriesData() {
    const URL = "https://restcountries.com/v3.1/all?fields=name";

    await fetch(URL)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }
  async function loadSpecificCountryData() {
    const specificCountryURL = `https://restcountries.com/v3.1/name/${selectedCountry}`;

    if (selectedCountry !== "") {
      await fetch(specificCountryURL)
        .then((response) => response.json())
        .then((data) => setSelectedCountryData(data));
    }
  }

  useEffect(() => {
    LoadAllCountriesData();
  }, []);

  useEffect(() => {
    loadSpecificCountryData();
  }, [selectedCountry]);

  console.log("specific data ", selectedCountryData);

  return (
    <div>
      <div>
        <label className="text-2xl mr-4 m-2">Countries</label>
        <select onChange={(event) => setselectedCountry(event.target.value)}>
          {countries
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map((item, index) => (
              <option value={item.name.common} key={index}>
                {item.name.common}
              </option>
            ))}
        </select>
      </div>

      <div className="text-center">
        <div className=" flex justify-center m-3">
          <Image
            src={selectedCountryData[0]?.flags.png}
            alt="Image"
            width={200}
            height={200}
            className="border-black border-2"
          />
        </div>
        <ShowHideDiv data={selectedCountryData[0]?.borders} name={"Borders"} />
        <ShowHideDiv
          data={
            selectedCountryData[0]?.languages &&
            Object.values(selectedCountryData[0]?.languages)
          }
          name={"Languages"}
        />
      </div>
    </div>
  );
};

export default Learning;
{
  /* <div>
          <button
            className="text-2xl font-semibold bg-blue-500 m-4 py-2 px-4 rounded-xl text-white hover:bg-blue-600 duration-300"
            onClick={() => {
              setShowSelectedCountryBorders(!showSelectedCountryBorders);
            }}
          >
            Show/Hide Borders
          </button>
          {showSelectedCountryBorders && (
            <ul>
              {selectedCountryData[0]?.borders?.map((item, index) => (
                <li key={index}>{index + 1 + ". " + item}</li>
              ))}
            </ul>
          )}
        </div> */
}
