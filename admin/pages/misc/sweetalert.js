import React, { useState } from "react";
import SweetAlert2 from "react-sweetalert2";

const Experiment = () => {
  const [showAlert, setShowAlert] = useState(false); // To manage the alert state

  return (
    <div>
      <button
        onClick={() => {
          setShowAlert(true); // Trigger alert visibility
        }}
      >
        Open
      </button>

      {showAlert && (
        <SweetAlert2
          show={showAlert}
          title="Basic Usage"
          text="Hello World"
          onConfirm={() => setShowAlert(false)} // Close the alert on confirm
          onCancel={() => setShowAlert(false)} // Optional: handle cancel action
        />
      )}
    </div>
  );
};

export default Experiment;
