import React from "react";

const DisplayWeather = ({ currentWeather }) => {
  console.log("currentWeather=>", currentWeather);

  return (
    <div className="flex flex-col items-center  max-w-md mx-auto">
      <h2 className="text-6xl font-extrabold mb-4">
        {currentWeather.temprature} <span className="text-4xl">°C</span>
      </h2>

      {currentWeather?.weatherIcon && (
        <img
          src={currentWeather?.icons?.replace("64x64", "128x128")}
          alt={currentWeather.description || "Weather icon"}
          className="w-32 h-32 md:w-40 md:h-40 mb-4"
        />
      )}

      <p className="text-xl font-semibold capitalize">
        {currentWeather.description}
      </p>

      <div className="flex justify-between items-center w-full mt-2">
        {/* Air Quality */}
        {currentWeather?.airQuality && (
          <div className="flex items-center mb-4 z-10">
            <span className="mr-2">Air Quality:</span>
            <span
              className={`text-lg font-semibold ${
                currentWeather.airQuality <= 50
                  ? "text-green-500"
                  : currentWeather.airQuality <= 100
                  ? "text-yellow-500"
                  : currentWeather.airQuality <= 150
                  ? "text-orange-500"
                  : "text-red-500"
              }`}
            >
              {currentWeather.airQuality}
            </span>
          </div>
        )}

        {currentWeather?.windSpeed && (
          <div className="flex items-center mb-4 z-10">
            <span className="mr-2">Wind Speed:</span>
            <span className="text-lg font-semibold">
              {currentWeather.windSpeed} m/s
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayWeather;
