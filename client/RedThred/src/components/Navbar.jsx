import React, { useState, useEffect } from "react";
import redthread from "../images/RED.png";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [userCLick, setUserClick] = useState(false);

  const handleCreateClick = () => {
    {
      user ? navigate("/cleanCreate") : navigate("/auth");
    }
  };

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleUserLoginClick = () => {
    setUserClick(!userCLick);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setUserClick(false);
    navigate("/");
  };
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const navigate = useNavigate();
  // console.log("Local Storage user: ", user);
  // console.log("UserClick: ", userCLick);

  return (
    <>
      <div className="flex justify-between w-full items-center px-10 py-2 shadow-md mb-3">
        <img
          src={redthread}
          alt=""
          className="max-h-[30px] hover:cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-4">
          <button
            onClick={handleCreateClick}
            className="bg-primary-medium hover:bg-primary-dark text-white font-bold py-2 px-4 rounded"
          >
            + Create
          </button>
          {user ? (
            <div className="relative">
              <button
                onClick={handleUserLoginClick}
                className="w-[50px] h-[50px] rounded-full flex items-center bg-purple-500 justify-center"
              >
                <img /* Google login */
                  src={user?.token?.picture}
                  alt=""
                  style={{ borderRadius: "50%" }}
                />
                <h3 className="text-white bolder text-center">
                  {" "}
                  {/* Mannual login */}
                  {user?.result?.name.charAt(0).toUpperCase()}
                </h3>
              </button>
              {userCLick && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <button className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200">
                    {user?.result?.name} {/* Mannual login */}
                    {user?.token?.name} {/* Google login */}
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-secondary-medium hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
