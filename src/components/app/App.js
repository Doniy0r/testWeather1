import './App.css';
import React, {useState} from "react";
import Search from "../search/search";
import CurrentWeather from "../current-weather/current-weather";
import {WEATHER_API_URL, WEATHER_API_KEY} from "../../api"
import Forecast from "../forecast/forecast";

function App() {

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
        const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);


        Promise.all([currentWeatherFetch, forecastFetch])
            .then(async (response) => {
                const WeatherResponse = await response[0].json();
                const forecastResponse = await response[1].json();

                setCurrentWeather({city: searchData.label, ...WeatherResponse})
                setForecast({city: searchData.label, ...forecastResponse})
            })
            .catch((err) => console.log(err))
    }

    console.log(currentWeather);
    console.log(forecast)

    return (
        <div className='container'>
            <Search onSearchChange={handleOnSearchChange}/>
            {currentWeather && <CurrentWeather data={currentWeather}/>}
            {forecast && <Forecast data={forecast}/>}
        </div>
    )
}

export default App;
