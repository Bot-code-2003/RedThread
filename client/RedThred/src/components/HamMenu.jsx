import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

const HamMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAppearanceOptions, setShowAppearanceOptions] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateClick = () => {
    setIsOpen(false);
    user ? navigate("/cleanCreate") : navigate("/auth");
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    navigate("/auth");
  };

  const logout = () => {
    localStorage.clear();
    setIsOpen(false);
    navigate("/");
  };

  const toggleTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sm:hidden relative" ref={menuRef}>
      <button onClick={toggleMenu}>
        {isOpen ? (
          <CloseIcon style={{ color: "gray" }} />
        ) : (
          <MenuIcon style={{ color: "gray" }} />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded shadow-lg p-2 z-10">
          {user ? (
            <>
              <button
                onClick={handleCreateClick}
                className="flex w-full justify-center gap-2 items-center bg-primary-medium hover:bg-primary-dark text-white font-bold py-2 px-4 rounded mb-2"
              >
                <AddOutlinedIcon />
                Create
              </button>
              <button className="block w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                {user?.result?.name}
              </button>
              <div
                onClick={() => setShowAppearanceOptions(!showAppearanceOptions)}
                className="relative"
              >
                <button className="flex justify-between w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                  <div className="flex gap-2">
                    <ContrastOutlinedIcon />
                    Appearance
                  </div>
                  <ChevronRightOutlinedIcon />
                </button>
                {showAppearanceOptions && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-gray-800 border rounded shadow-lg p-3">
                    <button
                      onClick={() => toggleTheme("light")}
                      className="flex gap-2 w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <LightModeOutlinedIcon />
                      Light
                    </button>
                    <button
                      onClick={() => toggleTheme("dark")}
                      className="flex gap-2 w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <DarkModeOutlinedIcon />
                      Dark
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={logout}
                className="flex gap-2 w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <LogoutIcon />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="flex w-full gap-2 bg-secondary-medium hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded"
            >
              <LoginOutlinedIcon />
              Log In
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HamMenu;
