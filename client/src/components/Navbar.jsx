import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import { useStateContext } from "../contexts/StateContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize, userProfile } =
    useStateContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setScreenSize, setActiveMenu]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="mt-2 flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <button onClick={handleActiveMenu}>
        <AiOutlineMenu />
      </button>
      <div>
        {!user && (
          <div className="flex items-center gap-2 p-1 rounded-lg text-right">
            <p className={screenSize >= 900 ? "" : "text-xs"}>
              <span className="text-gray-400 text-14">Please</span>
              <NavLink
                to="/login"
                className="text-blue-400 font-bold ml-1 text-14"
              >
                Login
              </NavLink>{" "}
              <span className="text-gray-400 text-14"> or </span>
              <NavLink
                to="/register"
                className="text-blue-400 font-bold ml-1 text-14"
              >
                Register
              </NavLink>{" "}
            </p>
          </div>
        )}
        {user && (
          <div className="flex items-center gap-2 p-1 rounded-lg text-right">
            <p className={screenSize >= 900 ? "" : "text-xs"}>
              <span className="text-gray-400 text-14">Welcome,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user["user"]}
              </span>
              <span className="text-gray-400 text-14">!</span>{" "}
              <NavLink
                to="/"
                onClick={logout}
                className="text-blue-400 font-bold ml-1 text-14"
              >
                Logout
              </NavLink>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
