import React, { useState } from "react";

const YourComponent = () => {
  const [rangeValue, setRangeValue] = useState(50);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="p-5">
      <input
        type="range"
        min="0"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
        className="slider appearance-none w-full h-3 rounded-full bg-gray-300 outline-none focus:outline-none overflow-hidden"
        style={{
          background: `linear-gradient(to right, #c8bcf6 0%, #c8bcf6 ${rangeValue}%, #D1D5DB ${rangeValue}%, #D1D5DB 100%)`,
        }}
      />
    </div>
  );
};

export default YourComponent;
