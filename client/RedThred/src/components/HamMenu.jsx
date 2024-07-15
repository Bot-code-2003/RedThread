import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";

const HamMenu = ({ user }) => {
  const navigate = useNavigate();
  const [showHamMenu, setShowHamMenu] = useState(false);
  const menuRef = useRef(null);

  const handleClick = () => {
    setShowHamMenu(!showHamMenu);
  };

  const handleCreateClick = () => {
    setShowHamMenu(false);
    user ? navigate("/cleanCreate") : navigate("/auth");
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      //if menu is open and if clicked outside of menu then...
      setShowHamMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, []);

  return (
    <div className="relative right-2 sm:hidden" ref={menuRef}>
      <div onClick={handleClick} className="relative ">
        <MenuIcon />
      </div>
      {showHamMenu && (
        <div className="absolute right-0 w-36 rounded p-3 shadow-lg bg-white">
          <button
            onClick={handleCreateClick}
            className="flex items-center gap-2"
          >
            <AddOutlinedIcon />
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default HamMenu;
