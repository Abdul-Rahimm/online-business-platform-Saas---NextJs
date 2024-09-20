import React, { useEffect, useState } from "react";

const ShowHideDiv = ({ data, name }) => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button
        className="text-2xl font-semibold bg-blue-500 m-4 py-2 px-4 rounded-xl text-white hover:bg-blue-600 duration-300"
        onClick={() => {
          setShow(!show);
        }}
      >
        Show/Hide {name}
      </button>
      {show && (
        <ul>
          {data?.map((item, index) => (
            <li key={index}>{index + 1 + ". " + item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowHideDiv;
