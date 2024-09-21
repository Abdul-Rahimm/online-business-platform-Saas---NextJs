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

  console.log("specific data ", selectedCountryData);
  // console.log("currency data ", Object.entries(selectedCountryData.currencies));

  return (
    <div>
      <div className="text-center">
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
        <div className="flex justify-center m-3">
          <button className="focus:shadow-2xl">
            <Image
              src={selectedCountryData?.flags?.png}
              alt="Image"
              height={200}
              width={200}
              className="border-black border-2"
              priority={true}
            />
          </button>
        </div>

        {/* working on the for each below */}
        <div className="bg-gray-300 grid grid-cols-4 text-center py-2">
          <ul>
            <span className="heading">Capital: </span>
            {selectedCountryData && selectedCountryData.capital[0]}
          </ul>
          <ul>
            <span className="heading">
              {selectedCountryData.capital[0]} latitude:{" "}
            </span>
            {selectedCountryData.capitalInfo.latlng[0]}
          </ul>
          <ul>
            <span className="heading">
              {selectedCountryData.capital[0]} longitude:{" "}
            </span>
            {selectedCountryData.capitalInfo.latlng[1]}
          </ul>
          <ul>
            Drive car at{" "}
            <span className="heading">{selectedCountryData.car.side}</span> side
          </ul>
        </div>

        <div className="bg-gray-200 grid grid-cols-4 text-center">
          <ShowHideDiv
            data={selectedCountryData?.altSpellings}
            name={"Names"}
          />
          <ShowHideDiv data={selectedCountryData?.borders} name={"Borders"} />

          <ShowHideDiv
            data={
              selectedCountryData?.languages &&
              Object.values(selectedCountryData?.languages)
            }
            name={"Languages"}
          />

          <ShowHideDiv
            data={selectedCountryData.continents}
            name={"Continents"}
          />

          {/* <ShowHideDiv data={selectedCountryData.currencies}/> */}
        </div>
      </div>
    </div>
  );
};

export default Learning;
