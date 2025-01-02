import { useRef, useState } from "react";
import DisplayWether from "./components/DisplayWether";
import SearchSection from "./components/SearchSection";
import { weatherCodes } from "./constant";
import HourlyForecast from "./components/HourlyForecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const searchRef = useRef(null);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);

    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    const next24HoursData = hourlyData.filter(({ time }) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
    });
    setHourlyForecasts(next24HoursData);
  };

  const getWeatherApi = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const temprature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const icons = data.current.condition.icon;
      const codes = data.current.condition.code;
      const airQuality = data?.current?.air_quality?.pm10;
      const windSpeed = data?.current?.wind_kph;
      const weatherIcon = Object.keys(weatherCodes).find((icon) =>
        weatherCodes[icon].includes(codes)
      );
      setCurrentWeather({
        temprature,
        description,
        weatherIcon,
        icons,
        airQuality,
        windSpeed,
      });
      const combinedHourData = [
        ...data.forecast.forecastday[0].hour,
        ...data.forecast.forecastday[1].hour,
      ];
      filterHourlyForecast(combinedHourData);
      searchRef.current.value = data.location.name;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300 text-center p-4 text-white h-screen overflow-auto">
      <h1 className="text-2xl font-bold">Weather App</h1>
      <div className="b bg-gradient-to-br from-[#352163] to-[#33143c] text-white p-8 rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
        <SearchSection getWeatherApi={getWeatherApi} searchRef={searchRef} />
        <DisplayWether currentWeather={currentWeather} />
        {/* {hourlyForecasts.map((hourlyWeather) => (
          <HourlyForecast
            key={hourlyWeather.time_epoch}
            hourlyWeather={hourlyWeather}
          />
        ))} */}
        <div className="bg-gradient-to-br from-[#352163] to-[#33143c] p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6 text-white">
            24-Hour Forecast
          </h2>
          <div className="flex overflow-x-scroll space-x-4 p-4 scrollbar-hide">
            {hourlyForecasts.map((hourlyWeather) => (
              <HourlyForecast
                key={hourlyWeather.time_epoch}
                hourlyWeather={hourlyWeather}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
