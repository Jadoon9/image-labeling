import React from "react";

const UploadFiles = ({ img, text1, text2, onChange }) => {
  return (
    <label
      for="file-upload"
      class="cursor-pointer w-40 h-40 flex flex-col items-center justify-center p-2 rounded "
    >
      <img src={img} alt="img" />
      <input
        id="file-upload"
        type="file"
        class="hidden"
        onChange={onChange}
        webkitdirectory
        directory
        multiple
      />
      {text1 && (
        <h3 className="h3-regular max-w-[100px] text-center mt-10">{text1}</h3>
      )}
    </label>
  );
};

export default UploadFiles;
