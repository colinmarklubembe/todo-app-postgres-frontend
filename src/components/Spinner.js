import React from "react";

const Spinner = () => {
  return (
    <div className="page-loader">
      <svg
        className="spinner mr-2"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="path"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
      <div>
        <span>
          <strong>Please wait ...</strong>
        </span>
      </div>
    </div>
  );
};

export default Spinner;
