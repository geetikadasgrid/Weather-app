import React from "react";

const HourlyForecast = ({ hourlyWeather }) => {
  const temprature = hourlyWeather.temp_c;
  const time = hourlyWeather.time;
  const icon = hourlyWeather.condition.icon;
  const description = hourlyWeather.condition.text;

  return (
    <div className="min-w-[150px] flex-shrink-0 bg-[#4a2b63] p-4 rounded-lg shadow-lg text-white flex flex-col items-center">
      <div className="text-xl font-bold mb-2">
        {new Date(time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <img src={icon} alt={description} className="w-16 h-16 mb-2" />

      <div className="text-lg font-semibold">{temprature}°C</div>

      <div className="text-sm mt-1">{description}</div>
    </div>
  );
};

export default HourlyForecast;
