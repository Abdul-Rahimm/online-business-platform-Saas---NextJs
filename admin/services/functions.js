function sorterByName() {
  People.sort((a, b) => {
    const nameComparison = a.name.localeCompare(b.name);

    if (nameComparison !== 0) {
      //meaning names arent same
      return nameComparison;
    }

    return b.age - a.age;
  });
}

function sortedByAge() {
  //agar age same hai to name pe sort
  People.sort((a, b) => {
    if (a.age - b.age !== 0) return a.age - b.age;

    return a.name.localeCompare(b.name);
  });
}

async function LoadAllCountriesData(setCountries) {
  const URL = "https://restcountries.com/v3.1/all?fields=name";

  await fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      setCountries(data);
    });
}
async function loadSpecificCountryData(
  selectedCountry,
  setSelectedCountryData
) {
  const specificCountryURL = `https://restcountries.com/v3.1/name/${selectedCountry}`;

  if (selectedCountry !== "") {
    await fetch(specificCountryURL)
      .then((response) => response.json())
      .then((data) => {
        setSelectedCountryData(data[0]);
      });
  }
}

export {
  sortedByAge,
  sorterByName,
  LoadAllCountriesData,
  loadSpecificCountryData,
};
