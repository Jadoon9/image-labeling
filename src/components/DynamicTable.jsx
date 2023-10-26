import React from "react";
import DropDown from "./DropDown";

const DynamicTable = ({ numRows, numCols, options }) => {
  // Generate rows and columns dynamically
  const rows = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from(
      { length: numCols },
      (_, colIndex) => `Row ${rowIndex + 1}, Col ${colIndex + 1}`
    )
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-collapse border-gray-200">
        <thead></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "" : "primary-background"} // Alternating row colors
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="py-1 px-4 border body-light border-gray-200"
                >
                  {/* <DropDown options={options} /> */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
