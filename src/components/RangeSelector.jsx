import React, { useState } from "react";

const YourComponent = ({ before, after, setRangeValue, rangeValue }) => {
  const calculatePercentage = (value) => {
    const min = Number(before);
    const max = Number(after);
    return ((value - min) / (max - min)) * 100 + "%";
  };

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="py-5">
      <input
        id="small-range"
        type="range"
        min={Number(before)}
        max={Number(after)}
        value={rangeValue}
        onChange={handleRangeChange}
        style={{
          background: `linear-gradient(to right, #A993FF 0%, #A993FF ${calculatePercentage(
            rangeValue
          )}, #D1D5DB ${calculatePercentage(rangeValue)}, #D1D5DB 100%)`,
        }}
        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
      ></input>
      <div className="flex justify-between text-sm text-gray-500">
        <span>{before}</span>
        <span>{after}</span>
      </div>
    </div>
  );
};

export default YourComponent;
