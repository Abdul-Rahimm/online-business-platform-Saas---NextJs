import React, { useState } from "react";

const Hardcoded = () => {
  const [country, setCountry] = useState("");

  return (
    <div>
      <h1>Selected Country : {country}</h1>
      <label>Country</label>
      <select onChange={(event) => setCountry(event.target.value)}>
        <option>Pakistan</option>
        <option>Australia</option>
        <option>England</option>
      </select>
    </div>
  );
};

export default Hardcoded;
