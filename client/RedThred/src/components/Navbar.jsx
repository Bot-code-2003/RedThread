import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getPostBySearch } from "../actions/posts";

import HamMenu from "./HamMenu";
import redthread from "../images/RED.png";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userClick, setUserClick] = useState(false);
  const [showAppearanceOptions, setShowAppearanceOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("profile"));
    if (storedUser) {
      const token = storedUser.token;
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          logout();
        }
      }
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("profile"));
    if (storedUser) {
      setUser(storedUser);
    }
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, [location]);

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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchValue.trim()) {
        setSearchValue("");
        navigate(`/search?query=${searchValue}`);
      } else {
        navigate("/");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearchClick(true);
    setSearchValue(e.target.value);
    dispatch(getPostBySearch(e.target.value));
  };

  const searchResults = useSelector((state) => state.posts.searchResults);

  useEffect(() => {
    setSearchPosts(searchResults.slice(0, 7));
  }, [searchResults]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setUserClick(false);
    }
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between w-full items-center px-10 py-2 shadow-md mb-3 bg-white dark:bg-gray-800">
      <img
        src={redthread}
        alt=""
        className="max-h-[30px] hover:cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div
        ref={searchRef}
        className="hidden z-10 sm:flex bg-white dark:bg-black w-[60%] border-2 border-gray-300 dark:border-gray-600 gap-2 p-2 rounded-md items-center justify-center relative"
      >
        <SearchIcon style={{ color: "gray" }} />
        <input
          className="dark:bg-black"
          type="text"
          placeholder="Search RedThread"
          value={searchValue}
          style={{
            width: "100%",
            outline: "none",
          }}
          onChange={handleSearchChange}
          onKeyDown={handleSearch}
        />
        {searchValue && searchPosts.length > 0 && searchClick && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-2 shadow-lg">
            {searchPosts.map((post) => (
              <div
                key={post._id}
                className="p-2 border-b border-gray-200 dark:border-gray-700"
              >
                <Link
                  onClick={() => setSearchValue("")}
                  to={`/postDetails/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.title}
                </Link>
              </div>
            ))}
            {searchPosts.length === 0 && (
              <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
      <div className="hidden sm:flex gap-4">
        <button
          onClick={handleCreateClick}
          className="flex gap-2 items-center bg-primary-medium hover:bg-primary-dark text-white font-bold  sm:py-2 sm:px-4 rounded"
        >
          <AddOutlinedIcon />
          Create
        </button>
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleUserLoginClick}
              className="w-[40px] h-[40px] rounded-full flex items-center border border-gray-500 justify-center"
            >
              {user?.result?.picture ? (
                <img
                  src={`${user?.result?.picture}`}
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <h3 className="text-black bolder text-center">
                  {user?.result?.name.charAt(0).toUpperCase()}
                </h3>
              )}
            </button>
            {userClick && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 border rounded shadow-lg p-3 z-10">
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
  );
};

export default Navbar;
