import React, { useState } from "react";

const YourComponent = () => {
  const [rangeValue, setRangeValue] = useState(50);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="p-5">
      <input
        id="small-range"
        type="range"
        min="0"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
        style={{
          background: `linear-gradient(to right, #A993FF 0%, #A993FF ${rangeValue}%, #D1D5DB ${rangeValue}%, #D1D5DB 100%)`,
        }}
        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
      ></input>
    </div>
  );
};

export default YourComponent;
