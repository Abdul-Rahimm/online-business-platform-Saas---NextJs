import React, { useState } from "react";

const Hardcoded = ({ topics }) => {
  return (
    <div className="text-center font-bold text-xl">
      <ul>
        {topics.map((item, index) => (
          <li key={index} className="mb-3">
            {index + 1 + " " + item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hardcoded;
