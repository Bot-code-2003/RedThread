import React, { useState, useEffect, useRef } from "react";
import redthread from "../images/RED.png";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import HamMenu from "./HamMenu";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile"))); // To check if user is logged in
  const [userClick, setUserClick] = useState(false); // To open user dropdown
  const [showAppearanceOptions, setShowAppearanceOptions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = () => {
    setShowAppearanceOptions(true);
  };

  const handleMouseLeave = () => {
    setShowAppearanceOptions(false);
  };

  const handleCreateClick = () => {
    user ? navigate("/cleanCreate") : navigate("/auth");
  };

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleUserLoginClick = () => {
    setUserClick(!userClick);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setUserClick(false);
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
  };

  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      //if menu is open and if clicked outside of menu then...
      setUserClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const decodedData = user?.token;
    if (decodedData) {
      if (decodedData.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [location]);

  return (
    <>
      <div className="flex justify-between w-full items-center px-10 py-2 shadow-md mb-3 bg-white dark:bg-gray-800">
        <img
          src={redthread}
          alt=""
          className="max-h-[30px] hover:cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="hidden sm:flex gap-4">
          <button
            onClick={handleCreateClick}
            className="flex gap-2 items-center bg-primary-medium hover:bg-primary-dark text-white font-bold  sm:py-2 sm:px-4 rounded"
          >
            <AddOutlinedIcon />
            Create
          </button>
          {user ? (
            <div className="relative " ref={menuRef}>
              <button
                onClick={handleUserLoginClick}
                className="w-[40px] h-[40px] rounded-full flex items-center bg-purple-500 justify-center"
              >
                {user?.result?.picture ? (
                  <img
                    src={user?.result?.picture}
                    alt=""
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <h3 className="text-white bolder text-center">
                    {user?.result?.name.charAt(0).toUpperCase()}
                  </h3>
                )}
              </button>
              {userClick && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border rounded shadow-lg p-3">
                  <button className="block w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                    {user?.result?.name}
                  </button>
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <button className="flex justify-between w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                      <div className="flex gap-3">
                        <ContrastOutlinedIcon />
                        Appearance
                      </div>
                      <ChevronRightOutlinedIcon />
                    </button>
                    {showAppearanceOptions && (
                      <div className="absolute left-0 -bottom-10 transform w-48 -translate-x-full bg-white dark:bg-gray-800 border rounded shadow-lg p-3">
                        <button
                          onClick={() => toggleTheme("light")}
                          className="flex gap-3 w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          <LightModeOutlinedIcon />
                          Light
                        </button>
                        <button
                          onClick={() => toggleTheme("dark")}
                          className="flex gap-3 w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                        >
                          <DarkModeOutlinedIcon />
                          Dark
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={logout}
                    className="flex gap-3 w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                  >
                    <LogoutIcon />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="flex gap-2 bg-secondary-medium hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded"
            >
              <LoginOutlinedIcon />
              Log In
            </button>
          )}
        </div>
        <HamMenu user={user} />
      </div>
    </>
  );
};

export default Navbar;
