import React, { useState } from "react";
import CleanTextForm from "./CleanTextForm";
import CleanImageForm from "./CleanImageForm";

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
      <div className="flex gap-2 mb-2">
        <button
          className={` rounded ${
            textForm
              ? "bg-gray-300 dark:bg-gray-700 dark:text-white underline"
              : "bg-gray-100 dark:bg-gray-800 dark:text-white"
          } p-2 hover:bg-gray-200`}
          onClick={handleTextClick}
        >
          Text
        </button>
        <button
          className={`rounded ${
            imageForm
              ? "bg-gray-300 dark:bg-gray-700 dark:text-white underline"
              : "bg-gray-100 dark:bg-gray-800 dark:text-white"
          } p-2 hover:bg-gray-200`}
          onClick={handleImageClick}
        >
          Image
        </button>
      </div>
      <div>{textForm ? <CleanTextForm /> : <CleanImageForm />}</div>
    </div>
  );
};

export default CleanForm;
