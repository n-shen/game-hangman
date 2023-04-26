import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize, userProfile } =
    useStateContext();

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
        <p className={screenSize >= 900 ? "" : "text-xs"}>Hello, Navbar</p>
        {userProfile && (
          <div className="flex items-center gap-2 p-1 rounded-lg text-right">
            <p className={screenSize >= 900 ? "" : "text-xs"}>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {userProfile["name"]}
              </span>{" "}
              <span className="text-gray-400 text-14">from</span>
              <span className="text-gray-400 font-bold ml-1 text-14">
                {userProfile["city"]}
              </span>{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
