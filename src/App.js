import "./App.css";
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  let [city, cityAnswer] = useState("");
  let [text, changeText] = useState("");

  let [description, changeDescription] = useState("");
  let [descriptiontext, changeDescriptiontext] = useState("");

  let [temperature, changeTemperature] = useState("");
  let [temperaturetext, changeTemperaturetext] = useState("");

  let [humidity, changeHumidity] = useState("");
  let [humiditytext, changeHumiditytext] = useState("");

  let [wind, changeWind] = useState("");
  let [windtext, changeWindtext] = useState("");

  let [icon, changeIcon] = useState("");
  let [icontext, changeIcontext] = useState("");

  function updateCity(event) {
    cityAnswer(event.target.value);
  }

  //

  function searchCity(event) {
    let APIkey = "3c7e72471b038017abb118fddfa1d953";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`;
    axios.get(url).then(cityTemperature);
    event.preventDefault();
    function cityTemperature(response) {
      changeTemperature(Math.round(response.data.main.temp));
      changeDescription(response.data.weather[0].description);
      changeHumidity(response.data.main.humidity);
      changeWind(response.data.wind.speed);
      changeIcon(response.data.weather[0].icon);
    }

    changeText(`${city}`);
    changeDescriptiontext(`Description: ${description}`);
    changeTemperaturetext(`Temperature: ${temperature}°C`);
    changeHumiditytext(`Humidity: ${humidity}%`);
    changeWindtext(`Wind: ${wind} km/h`);
    changeIcontext(
      <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
    );
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
