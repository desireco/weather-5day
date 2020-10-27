import Nav from '../components/nav'
import FiveDayForecast from '../components/FiveDayForecast'
import { useState } from 'react';

const detectLocation = new Promise((resolve,reject) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve(position.coords);
    }, (error) => {
      if(error.code === error.PERMISSION_DENIED) {
        console.error("Error detecting location.");
      }
    });
  }
});


export default function IndexPage() {
  const [weather, setWeather] = useState({});


  async function fetchWeatherData(location) {
    const res = await fetch(`${process.env.BASE_URL}/api/weather/?lat=${location.latitude}&lon=${location.longitude}`)
    const weather = await res.json()
  
    if (weather.errors) {
      console.error(weather.errors)
      throw new Error('Failed to fetch API')
    }
    return weather;
  }
  
  detectLocation.then((location) => {
        fetchWeatherData(location).then((weather) => { setWeather(weather)})
      }).catch(() => {
        // pass Chicago as location
        fetchWeatherData({latitude: 41.9464184, longitude: -87.7073992}).then((weather) => { setWeather(weather)})
      });

  return (
    <div>
      <Nav />
      <div className="py-20 text-center">
        <h1 className="text-5xl text-accent-1">
          5 Day Weather
        </h1>
        <FiveDayForecast weather={weather}></FiveDayForecast>
      </div>
    </div>
  )
}
