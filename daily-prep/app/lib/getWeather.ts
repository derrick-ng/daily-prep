import axios from "axios";
import prisma from "../../prisma/client";


export const getWeather = async (id: number) => {
    let weather: string = "";

    const apiKey = "0f519fb83d4e4e8407dc01c9311395ef";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q="
    const apiUrl2 = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q="

    const AdditionalInfo = await prisma.additionalInfo.findMany({
        where: {
            authorId: id,
        }
    })

    const AdditionalInfoCount = await prisma.additionalInfo.count({
        where: {
            authorId: id,
        }
    })

    for (let i = 0; i < AdditionalInfoCount; i++) {
        let weatherCity = AdditionalInfo[i].weatherCity;

        try {
            let URL = `${apiUrl}${weatherCity}&appid=${apiKey}`
            let currentWeatherResponse = await axios.get(URL);
            let currentWeather = currentWeatherResponse.data;

            let URL2 = `${apiUrl2}${weatherCity}&appid=${apiKey}`
            let forecastWeatherResponse = await axios.get(URL2);
            let forecastWeather = forecastWeatherResponse.data;


            let minTemp = Math.round(currentWeather.main.temp_min);
            let maxTemp = Math.round(currentWeather.main.temp_max);
            let weatherCondition = currentWeather.weather[0].main;
            let wind = currentWeather.wind.speed;
            
            let sendWind = wind > 20 ? true: false;
            
            //check weather condition for next 10 hours, storing hours where it will rain
            const rainyHours = [];
            for (let i = 0; i < 10; i++) {
                let hourlyForecast = forecastWeather.list[i].weather[0].main;
                if (hourlyForecast === "Rain") {
                    let hourInPST = (i + 8) % 12;
                    rainyHours.push(hourInPST);
                }
            }

            weather = `${minTemp}-${maxTemp}°F, ${weatherCondition}`;

            if (rainyHours.length > 0) {
                weather += `, raining at ${rainyHours}`
            }
            
            if (sendWind) {
                weather += `, wind: ${wind} mph`
            
            }
        } catch (error) {
            console.log("ffail");
            
        }
    }
    return weather;
}

// const weather = async () => {
//     const a = await getWeather(21);
//     console.log(a);
// }
// weather();