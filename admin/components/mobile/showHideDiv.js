import React, { useEffect, useState } from "react";

const ShowHideDiv = ({ data, name }) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button
        className="text-lg focus:bg-blue-600 font-semibold bg-blue-500 m-4 py-2 px-4 rounded-xl text-white hover:bg-blue-600 duration-300"
        onClick={() => {
          setShow(!show);
        }}
      >
        {name}
      </button>
      {show && (
        <ul>
          {data?.map((item, index) => (
            <li key={index} className="text-sm">
              {index + 1 + ". " + item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowHideDiv;
