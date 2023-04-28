import React, { useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import { Footer } from "../components";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import { useLogout } from "../hooks/useLogout";

const Setting = () => {
  const { shared_info, screenSize } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = shared_info.baseURL;
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleDestroy = () => {
    axios
      .post(
        `${baseURL}/profile/destroy`,
        {
          uid: user.user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data["success"]) {
          logout();
        } else {
          setLoading(false);
          setError(response.data["message"]);
        }
      });
  };
  return (
    <div className={screenSize >= 900 ? "mt-0" : "mt-16"}>
      <h2 className="text-center font-bold">
        After deletion, all your data including customized dictionary will be
        lost.
      </h2>
      {error && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="flex justify-center">
        <button
          onClick={handleDestroy}
          disabled={loading}
          type="button"
          className="mt-5 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Delete My Profile
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Setting;
