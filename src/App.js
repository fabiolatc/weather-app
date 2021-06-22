import "./App.css";
import React, { useState } from "react";
import axios from "axios";
export default function App() {
  let [city, cityAnswer] = useState("");
  let [text, changeText] = useState("");
  let [descriptiontext, changeDescriptiontext] = useState("");
  let [temperaturetext, changeTemperaturetext] = useState("");
  let [humiditytext, changeHumiditytext] = useState("");
  let [windtext, changeWindtext] = useState("");
  let [icontext, changeIcontext] = useState("");
  function updateCity(event) {
    cityAnswer(event.target.value);
  }
  function searchCity(event) {
    let APIkey = "3c7e72471b038017abb118fddfa1d953";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
    axios.get(url).then(cityTemperature);
    event.preventDefault();
    function cityTemperature(response) {
      changeText(`${city}`);
      changeTemperaturetext(
        `Temperature: ${Math.round(response.data.main.temp)}°C`
      );
      changeDescriptiontext(
        `Description: ${response.data.weather[0].description}`
      );
      changeHumiditytext(`Humidity: ${response.data.main.humidity}%`);
      changeWindtext(`Wind: ${response.data.wind.speed} km/h`);
      changeIcontext(
        <img
          src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
        />
      );
    }
  }
  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={searchCity}>
        <input type="text" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
      <h2>{text}</h2>
      <ul>
        <li>{descriptiontext}</li>
        <li>{temperaturetext}</li>
        <li>{humiditytext}</li>
        <li>{windtext}</li>
        <li>{icontext}</li>
      </ul>
    </div>
  );
}
