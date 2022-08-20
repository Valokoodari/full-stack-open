import axios from "axios"
import { useState, useEffect } from "react"

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather'
        + `?lat=${country.capitalInfo.latlng[0]}`
        + `&lon=${country.capitalInfo.latlng[1]}`
        + `&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        + '&units=metric')
      .then(response => setWeather(response.data))
  }, [country.capitalInfo.latlng])

  if (Object.keys(weather).length === 0) return

  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>Temperature {weather.main.temp} °C</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
