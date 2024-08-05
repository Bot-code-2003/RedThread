import React, { useState, useEffect } from "react";
import { signup } from "../actions/auth";

const ProfileComponent = ({
  initialFormData,
  setInitialFormData,
  dispatch,
  navigate,
}) => {
  const [formData, setFormData] = useState(initialFormData);
  const interestArray = [
    "Anime",
    "KDrama",
    "CDrama",
    "Series",
    "Games",
    "Music",
    "Thai Drama",
    "Manga",
    "Manhwa",
    "Manhua",
  ];

  const handleButtonClick = (interest) => {
    setFormData((prevFormData) => {
      const { interests } = prevFormData;
      if (interests.includes(interest)) {
        return {
          ...prevFormData,
          interests: interests.filter((item) => item !== interest),
        };
      } else {
        return {
          ...prevFormData,
          interests: [...interests, interest],
        };
      }
    });
  };

  const handleContinue = () => {
    setInitialFormData(formData);
    dispatch(signup(formData, navigate));
  };

  useEffect(() => {
    console.log("formData.interests: ", formData.interests);
  }, [formData]);

  return (
    <div className="flex flex-col">
      <h1>Choose your interests</h1>
      <div>
        {interestArray.map((interest) => (
          <button
            key={interest}
            onClick={() => handleButtonClick(interest)}
            style={{
              backgroundColor: formData.interests.includes(interest)
                ? "red"
                : "green",
              color: "white",
              padding: "10px",
              borderRadius: "10px",
              margin: "10px",
            }}
          >
            {interest}
          </button>
        ))}
      </div>
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
};

export default ProfileComponent;
