// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchWeather } from "../weatherSlice/weatherSlice";

// export const Weather = () => {
//   const [city, setCity] = useState("");
//   const dispatch = useDispatch();
//   const { loading, data, error } = useSelector((state) => state.weather);

//   const handleSearch = () => {
//     if (!city.trim()) return;
//     dispatch(fetchWeather(city));
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-6">
//       {/* Header */}
//       <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
//         🌤 Weather App
//       </h1>

//       {/* Search */}
//       <div className="flex w-full max-w-lg gap-2 mb-6">
//         <input
//           type="text"
//           placeholder="Enter City Name..."
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//           className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           onClick={handleSearch}
//           className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-all"
//         >
//           Search
//         </button>
//       </div>

//       {/* Loader */}
//       {loading && (
//         <div className="mt-10">
//           <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       )}

//       {/* Error */}
//       {error && <p className="text-red-400 mt-4">{error}</p>}

//       {/* Weather Data */}
//       {data && !loading && (
//         <div className="w-full max-w-lg">
//           {/* Current Weather */}
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-3xl font-bold">{data.name}</h2>
//                 <p className="capitalize text-gray-300">
//                   {data.weather[0].description}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="text-5xl font-extrabold">
//                   {Math.round(data.main.temp - 273.15)}°C
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   Feels like {Math.round(data.main.feels_like - 273.15)}°C
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Details */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-white/10 rounded-xl p-4 text-center">
//               <p className="text-lg">💨</p>
//               <p className="text-gray-400 text-sm">Wind</p>
//               <p className="font-bold">{(data.wind.speed * 3.6).toFixed(1)} km/h</p>
//             </div>

//             <div className="bg-white/10 rounded-xl p-4 text-center">
//               <p className="text-lg">💧</p>
//               <p className="text-gray-400 text-sm">Humidity</p>
//               <p className="font-bold">{data.main.humidity}%</p>
//             </div>

//             <div className="bg-white/10 rounded-xl p-4 text-center">
//               <p className="text-lg">📊</p>
//               <p className="text-gray-400 text-sm">Pressure</p>
//               <p className="font-bold">{data.main.pressure} hPa</p>
//             </div>

//             <div className="bg-white/10 rounded-xl p-4 text-center">
//               <p className="text-lg">👁</p>
//               <p className="text-gray-400 text-sm">Visibility</p>
//               <p className="font-bold">{data.visibility / 1000} km</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../weatherSlice/weatherSlice";

export const Weather = () => {
  const [city, setCity] = useState("");
  const defaultCities = ["London", "Kochi", "Kolkata", "Bengaluru", "Mumbai", "Chennai"];
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.weather);

  const [defaultData, setDefaultData] = useState([]);

  useEffect(() => {
    const fetchDefaultCities = async () => {
      let results = [];
      for (let city of defaultCities) {
        try {
          const res = await dispatch(fetchWeather(city)).unwrap();
          results.push(res);
        } catch (err) {
          console.error(err);
        }
      }
      setDefaultData(results);
    };
    fetchDefaultCities();
  }, [dispatch]);

  const handleSearch = () => {
    if (!city.trim()) return;
    dispatch(fetchWeather(city));
    setDefaultData([]); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8">
        🌤 Weather App
      </h1>

      <div className="flex w-full max-w-lg gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter City Name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold hover:scale-105 transition-all"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="mt-10">
          <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {data && !loading && defaultData.length === 0 && (
        <div className="w-full max-w-lg">
          <WeatherCard data={data} />
        </div>
      )}

      {defaultData.length > 0 && (
        <div className="w-full max-w-6xl mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultData.map((cityData, index) => (
            <WeatherCard key={index} data={cityData} />
          ))}
        </div>
      )}
    </div>
  );
};

const WeatherCard = ({ data }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="capitalize text-gray-300">{data.weather[0].description}</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-extrabold">
            {Math.round(data.main.temp - 273.15)}°C
          </p>
          <p className="text-sm text-gray-400">
            Feels like {Math.round(data.main.feels_like - 273.15)}°C
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-lg">💨</p>
          <p className="text-gray-400 text-sm">Wind</p>
          <p className="font-bold">{(data.wind.speed * 3.6).toFixed(1)} km/h</p>
        </div>

        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-lg">💧</p>
          <p className="text-gray-400 text-sm">Humidity</p>
          <p className="font-bold">{data.main.humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-lg">📊</p>
          <p className="text-gray-400 text-sm">Pressure</p>
          <p className="font-bold">{data.main.pressure} hPa</p>
        </div>

        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-lg">👁</p>
          <p className="text-gray-400 text-sm">Visibility</p>
          <p className="font-bold">{data.visibility / 1000} km</p>
        </div>
      </div>
    </div>
  );
};
