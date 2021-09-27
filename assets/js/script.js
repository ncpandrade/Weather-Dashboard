//variables to store a reference to the <form> element using each id
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
//variables to reference DOM elements
var currentWeatherContainer = document.querySelector('#weatherCurrent');
var forecastContainer = document.querySelector('#forecast-container');


//get user Weather function
var getUserWeather = function (city) {
    //format the weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0709fe582a3226805c5caaebd2b415a5'

    //make a request to the url concatenating 'city' value
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayCurrentWeather(data, city);

            //get city coordinates from returend object
            var coordLat = data.coord.lat;
            var coordLon = data.coord.lon;
            console.log(coordLat, coordLon);

            //return fetch request to the one call api with the coordinates 
            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + coordLat + '&lon=' + coordLon + '&exclude=current, minutely,hourly, alerts&appid=0709fe582a3226805c5caaebd2b415a5'
            );
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                console.log(response);
                displayForecast();
            });
    });
}


//Function to obtain city input on button click
var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();
    console.log(city);
    //check if cityname was entered
    if (city) {
        //if yes, pass cityname into getUserWeather()
        getUserWeather(city);
        //clear value from the <input> element
        cityInputEl.value = "";
    } else {
        alert("Please enter a City name");
    }

    console.log(event);
};
// clear old content from container
currentWeatherContainer.textContent = "";

//FUNCTION to display current weather
var displayCurrentWeather = function (weather) {
    console.log(weather);
    // console.log(city);

    //format weather info
    var cityInfo = weather.name
    console.log(cityInfo);

    //format today's weather info
    var weatherInfo = weather.main.temp + weather.wind.speed + weather.main.humidity;

    //create container for current weather
    var currentWeatherEl = document.createElement("div");
    currentWeatherEl.classList = "list-item flex-row justify-space-between align-center";

    //create container for current city and date
    var currentCityEl = document.createElement("div");
    currentCityEl.textContent = cityInfo;

    //append to currentWeatherContainer DOM
    currentWeatherContainer.appendChild(currentCityEl);

    //create container for today's weather info
    var todaysWeatherInfoEl = document.createElement("div");
    todaysWeatherInfoEl.textContent = weatherInfo;

    //append to currentWeatherContainer DOM
    currentWeatherContainer.appendChild(todaysWeatherInfoEl);
}
//FUNCTION to display forecast weather
var displayForecast = function (weather) {
    //clear old content
    forecastContainer.textContent = "";

    //loop over forecast days max 5
    for (var i = 0; i < 5; i++) {

        //format forecast info temp,humidity,wind
        var forecastInfo = weather.daily[i].temp.day;
        console.log(forecastInfo);

        // //create a container for each forecast day
        // var forecastEl = document.createElement("div");
        // forecastEl.classList = "list-item flex-row justify-space-between align-center";

        // //create a span element for date
        // var dateEl = document.createElement("span");
        // //dateEl.textContent = enter date here

        // //append to container
        // forecastEl.appendChild(dateEl);

        // //create icon element
        // var iconEl = document.createElement("span");
        // iconEl.classList = "flex-row align-center";
        // //insert icon

        // //append to container
        // forecastEl.appendchile(iconEl);

        // //create div element for weather details
        // var forecastInfoEl = document.createElement("div");
        // // forecastInfoEl.textContent = 
        // //



    }
}

// submit event listener - when user clicks Get City formSubmitHandler is activated
userFormEl.addEventListener("submit", formSubmitHandler);
