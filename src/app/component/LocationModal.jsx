import React, { useState } from "react";
import API from "../ApiRoutes";
import axios from "axios";
import toast from "react-hot-toast";
const LocationModal = ({ onClose , fetchLocation}) => {
  // const [categoryName, setCategoryName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      await axios.post(`${API.location}`, {
        city: city,
        state: state,
        country: country,
      });
      toast.success("New location Created, Please refresh the page.", {
        style: {
          fontSize: "14px",
        },
      });
      // Close the modal
      onClose();
      // Reset the category name input
      setCity("");
      setState("");
      setCountry("");
      fetchLocation()
    } catch (error) {
      console.error("Error creating category:", error);
      // Handle error appropriately, e.g., show error message to user
    }
  };
  return (
    <div className="flex overflow-y-auto fixed inset-0 z-10 justify-center items-center">
      <div className="flex justify-center items-center px-4 pt-4 pb-20">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block overflow-hidden text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-xl lg:max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-medium text-gray-900 fs-3">
                    Create New Location
                  </h3>
                  <div className="mt-5">
                    <input
                      type="text"
                      name="categoryName"
                      placeholder="City"
                      id="categoryName"
                      className="block p-2 mt-1 w-full rounded-md border border-gray-300 fs-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="State"
                      name="categoryName"
                      id="categoryName"
                      className="block p-2 mt-1 w-full rounded-md border border-gray-300 fs-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <input
                      type="text"
                      placeholder="Country"
                      name="categoryName"
                      id="categoryName"
                      className="block p-2 mt-1 w-full rounded-md border border-gray-300 fs-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 px-4 py-3 bg-gray-50">
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center px-6 py-3 mr-5 font-medium text-white bg-green-600 rounded-md border border-transparent shadow-sm fs-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                >
                  Create
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="inline-flex justify-center px-6 py-3 font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm fs-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
