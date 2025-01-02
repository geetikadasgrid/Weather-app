import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { BiCurrentLocation } from "react-icons/bi";

const SearchSection = ({ getWeatherApi, searchRef }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${searchInput}&days=5&aqi=yes`;
    getWeatherApi(API_URL);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleInputLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${latitude},${longitude}&days=5&aqi=yes`;
        getWeatherApi(API_URL);
      },
      () => {
        alert("Please enable permission to access your current location.");
      }
    );
  };

  return (
    <div className="flex flex-row items-center gap-4 p-6">
      <form className="w-full flex gap-2" onSubmit={handleSearch}>
        <div className="flex items-center bg-transparent border border-gray-300 rounded-lg backdrop-blur-md shadow-md w-full">
          <span className="text-gray-500 px-3">
            <CiSearch className="text-xl" />
          </span>
          <input
            className="w-full py-2 px-3 text-white uppercase bg-transparent rounded focus:outline-none"
            type="text"
            ref={searchRef}
            placeholder={
              searchRef.current ? searchRef.current.value : "Enter city name"
            }
            value={searchInput}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <button
        className="flex items-center gap-2 text-white px-4 py-2 shadow-md border border-gray-300 rounded-lg transition"
        onClick={handleInputLocation}
      >
        <BiCurrentLocation className="text-xl p-1" />
      </button>
    </div>
  );
};

export default SearchSection;
