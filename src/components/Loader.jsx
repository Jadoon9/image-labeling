import React from "react";
import { FallingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <FallingLines
        color="#9f7aea"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default Loader;
