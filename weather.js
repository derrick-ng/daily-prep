require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;
const APIKey = process.env.OPENWEATHERMAP_KEY;

app.get("/weather", async (req, res) => {
  const cityName = req.query.city;
  let APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;

  try {
    const response = await axios.get(APIUrl);
    let weather = response.data;
    let temp = Math.round(((weather.main.temp - 273.15) * 9) / 5 + 32);
    let tempMin = Math.round(((weather.main.temp_min - 273.15) * 9) / 5 + 32);
    let tempMax = Math.round(((weather.main.temp_max - 273.15) * 9) / 5 + 32);
    res.json({ temp, tempMin, tempMax });
    console.log(weather);
    
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log("server running on port: ", PORT);
});
