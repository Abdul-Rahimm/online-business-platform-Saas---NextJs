// import { sortedByAge } from "@/services/functions";
import React, { useEffect, useState } from "react";
import ShowHideDiv from "@/components/mobile/showHideDiv";
import {
  loadSpecificCountryData,
  LoadAllCountriesData,
} from "@/services/functions";
import Image from "next/image";
// const URL = "https://api.eatachi.co/api/country";
// https://restcountries.com/v3.1/all?fields=name,capital,currencies

const Learning = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("Afghanistan");
  const [selectedCountryData, setSelectedCountryData] = useState([]);

  useEffect(() => {
    LoadAllCountriesData(setCountries);
  }, []);

  useEffect(() => {
    loadSpecificCountryData(selectedCountry, setSelectedCountryData);
  }, [selectedCountry]);

  const hello = selectedCountryData;
  console.log("specific data ", hello);

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

      <div className="">
        <div className=" flex justify-center m-3">
          <Image
            src={selectedCountryData[0]?.flags.png}
            alt="Image"
            width={200}
            height={200}
            className="border-black border-2"
            priority={true}
          />
        </div>

        {/* working on the for each below */}
        <div className="bg-gray-300 grid grid-cols-4">
          <ul>
            {Object.entries(selectedCountryData)[0].forEach((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-200 grid grid-cols-2 text-center">
          <ShowHideDiv
            data={selectedCountryData[0]?.borders}
            name={"Borders"}
          />
          <ShowHideDiv
            data={
              selectedCountryData[0]?.languages &&
              Object.values(selectedCountryData[0]?.languages)
            }
            name={"Languages"}
          />
        </div>
      </div>
    </div>
  );
};

export default Learning;
