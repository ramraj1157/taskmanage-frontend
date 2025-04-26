// components/ToggleSwitch.js
import React from "react";

const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <div
      onClick={handleToggle}
      className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? "translate-x-6" : ""
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
