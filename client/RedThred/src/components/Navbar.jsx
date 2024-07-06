import React from "react";
import redthread from "../images/RED.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const handleCreateClick = () => {
    navigate("/create");
  };

  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center px-6 py-2 shadow-md mb-3">
      <img src={redthread} alt="" className="max-h-[30px]" />
      <button
        onClick={handleCreateClick}
        className="bg-primary-medium text-white font-bold py-2 px-4 rounded"
      >
        + Create
      </button>
    </div>
  );
};

export default Navbar;
