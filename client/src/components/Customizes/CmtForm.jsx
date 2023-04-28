import { useState } from "react";
import axios from "axios";

import { useStateContext } from "../../contexts/StateContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import pandaIcon from "../../assets/pandaIcon.png";
// import { useCustomizesContext } from "../../hooks/useCustomizesContext";

const CmtForm = () => {
  const { shared_info } = useStateContext();
  const baseURL = shared_info.baseURL;
  const { user } = useAuthContext();
  // const { dispatch } = useCustomizesContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [wordOne, setWordOne] = useState("");
  const [wordTwo, setWordTwo] = useState("");
  const [wordThree, setWordThree] = useState("");
  const [wordFour, setWordFour] = useState("");
  const [wordFive, setWordFive] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const words_array = [
      wordOne,
      wordTwo,
      wordThree,
      wordFour,
      wordFive,
    ].filter((str) => str !== "");
    if (user && title && words_array !== []) {
      handleSave(words_array);
    } else {
      setMessage("");
      setError("Missing required fields!");
      setLoading(false);
    }
  };

  const handleSave = (words_array) => {
    axios
      .post(
        `${baseURL}/ctm/post`,
        {
          ctmTitle: title,
          ctmDescription: description,
          ctmWords: words_array,
          ctmUser: user.user,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log(response.data);
        if (response.data["success"]) {
          setError("");
          setMessage("A new dictionary has been created!");
        } else {
          setError(response.data["message"]);
          setMessage("");
        }
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={pandaIcon}
            alt="Panda Icon"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new dictionary
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {error && (
            <div role="alert" className="mb-5">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                An error occurred
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{error}</p>
              </div>
            </div>
          )}
          {message && (
            <div role="alert" className="mb-5">
              <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                Success
              </div>
              <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                <p>{message}</p>
              </div>
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description (optional)
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="decription"
                  name="description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="wordOne"
                onChange={(e) =>
                  setWordOne(
                    e.target.value.toLowerCase().replace(/[^a-z]/gi, "")
                  )
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="wordOne"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                1st word
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="wordTwo"
                onChange={(e) =>
                  setWordTwo(
                    e.target.value.toLowerCase().replace(/[^a-z]/gi, "")
                  )
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="wordTwo"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                2nd word
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="wordThree"
                onChange={(e) =>
                  setWordThree(
                    e.target.value.toLowerCase().replace(/[^a-z]/gi, "")
                  )
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="wordThree"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                3rd word
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="wordFour"
                onChange={(e) =>
                  setWordFour(
                    e.target.value.toLowerCase().replace(/[^a-z]/gi, "")
                  )
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="wordFour"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                4th word
              </label>
            </div>

            <div className="relative z-0">
              <input
                type="text"
                id="wordFive"
                onChange={(e) =>
                  setWordFive(
                    e.target.value.toLowerCase().replace(/[^a-z]/gi, "")
                  )
                }
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="wordFive"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                5th word
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="flex w-1/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>

              <button
                type="reset"
                onClick={() => {
                  setMessage("");
                  setError("");
                }}
                disabled={loading}
                className="flex ml-3 w-1/3 justify-center rounded-md bg-slate-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CmtForm;
