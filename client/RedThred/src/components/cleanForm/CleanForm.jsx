import React, { useState } from "react";
import CleanTextForm from "./CleanTextForm";
// import CleanImageForm from "./CleanImageForm";
import Alert from "@mui/material/Alert";

const CleanForm = () => {
  const handleTextClick = () => {
    setTextForm(true);
    setImageForm(false);
  };
  const handleImageClick = () => {
    setTextForm(false);
    setImageForm(true);
  };
  const [textForm, setTextForm] = useState(true);
  const [imageForm, setImageForm] = useState(false);
  return (
    <div>
      {/* <div className="flex gap-2 mb-4">
        <button
          className={` rounded w-full ${
            textForm
              ? "bg-gray-400 dark:bg-gray-700 dark:text-white underline"
              : "bg-gray-100 dark:bg-gray-800 dark:text-white"
          } p-2 hover:bg-gray-300`}
          onClick={handleTextClick}
        >
          Text
        </button>
        <button
          className={`rounded w-full ${
            imageForm
              ? "bg-gray-400 dark:bg-gray-700 dark:text-white underline"
              : "bg-gray-100 dark:bg-gray-800 dark:text-white"
          } p-2 hover:bg-gray-300`}
          onClick={handleImageClick}
        >
          Image
        </button>
      </div> */}
      {/* <Alert severity="info">
        Please use appropriate tags for better recommendations.
      </Alert> */}
      <CleanTextForm />
    </div>
  );
};

export default CleanForm;
