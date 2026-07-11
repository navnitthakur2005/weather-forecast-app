const apiKey = "dabcc51ade474bee9e032446261107";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        getWeather();
    }
});

async function getWeather(){

    const city = cityInput.value.trim();

    if(city===""){
        alert("Please enter a city name.");
        return;
    }

    const url=`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try{

        const response=await fetch(url);

        const data=await response.json();

        if(data.error){

            weatherResult.style.display="block";
            weatherResult.innerHTML="<h2 class='error'>City Not Found</h2>";
            return;

        }

        weatherResult.style.display="block";

        weatherIcon.src=data.current.condition.icon;

        cityName.innerHTML=`${data.location.name}, ${data.location.country}`;

        temperature.innerHTML=`${data.current.temp_c} °C`;

        condition.innerHTML=`Condition : ${data.current.condition.text}`;

        humidity.innerHTML=`Humidity : ${data.current.humidity}%`;

        wind.innerHTML=`Wind Speed : ${data.current.wind_kph} km/h`;

        weatherResult.innerHTML="";

        weatherResult.appendChild(weatherIcon);
        weatherResult.appendChild(cityName);
        weatherResult.appendChild(temperature);
        weatherResult.appendChild(condition);
        weatherResult.appendChild(humidity);
        weatherResult.appendChild(wind);

    }

    catch(error){

        weatherResult.style.display="block";
        weatherResult.innerHTML="<h2 class='error'>Something went wrong</h2>";

    }

}