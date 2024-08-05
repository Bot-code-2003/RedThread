import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Interests = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [count, setCount] = useState(0);

  const handleClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setCount((prevCount) => prevCount - 1);
      setSelectedInterests(
        selectedInterests.filter(
          (selectedInterest) => selectedInterest !== interest
        )
      );
    } else {
      setCount((prevCount) => prevCount + 1);
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const interests = [
    "Anime",
    "Kdrama",
    "Manga",
    "Jdrama",
    "Cdrama",
    "Webtoons",
    "Light Novels",
    "Anime Movies",
    "Korean Variety Shows",
    "Japanese Anime Films",
    "Cosplay",
    "Otaku Culture",
    "Manhwa",
    "Visual Novels",
    "Anime Merchandise",
    "Japanese Culture",
    "Korean Pop",
    "Chinese Historical Dramas",
    "Fantasy Novels",
    "Science Fiction Anime",
  ];

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="flex flex-col justify-center p-10 sm:px-36 sm:py-10">
      <h1 className="text-3xl text-center dark:text-white">
        Welcome {user.result.name}
      </h1>
      <h1 className="text-xl text-center dark:text-white">
        Pick any 5 interests so we can customize your feed.
      </h1>
      <div className="flex gap-2 flex-wrap justify-center mt-7">
        {interests.map((interest) => (
          <p
            key={interest}
            onClick={() => handleClick(interest)}
            className={`text-md sm:text-lg dark:text-white dark:border-gray-500 p-1 rounded-md border hover:border-black dark:hover:border-white hover:cursor-pointer ${
              selectedInterests.includes(interest)
                ? "bg-gradient-to-r from-purpleBlueStart to-purpleBlueEnd text-white border border-black dark:border-white"
                : count === 5
                ? "opacity-50 pointer-events-none"
                : "pointer-events-auto"
            }`}
          >
            {interest}
          </p>
        ))}
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-gradient-to-r from-purpleBlueStart hover:from-purple-800 hover:to-blue-800 to-purpleBlueEnd text-white p-2 rounded-md mt-5"
      >
        Next
      </button>
    </div>
  );
};

export default Interests;
