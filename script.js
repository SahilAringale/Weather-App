const apiKey = "YOUR_API_KEY_HERE";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

getWeatherBtn.addEventListener("click", () => {
    const cityName = cityInput.value;
    if(cityName === "") {
        weatherResult.innerHTML = "Please enter a city name";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if(data.cod === "404") {
            weatherResult.innerHTML = "City not found!";
            return;
        }
        weatherResult.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
    })
    .catch(error => {
        weatherResult.innerHTML = "Error fetching data";
        console.error(error);
    });
});
