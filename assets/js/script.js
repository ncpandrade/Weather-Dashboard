//variables to store a reference to the <form> element using each id
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
//variables to reference DOM elements
var currentWeatherContainer = document.querySelector('#weatherCurrent');


//get user Weather function
var getUserWeather = function (city) {
    //format the weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0709fe582a3226805c5caaebd2b415a5'

    //make a request to the url concatenating 'city' value
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayCurrentWeather(data, city);

            //return fetch request to the one call api with the coordinates
            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' +coordLat + '&lon=' + coordLan + '&exclude=current, minutely,hourly, alerts&appid=0709fe582a3226805c5caaebd2b415a5'
            );
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(reponse) {
            console.log(response);
        });
    });
}

//FUNCTION to make api request for forecast info
var getForecast = function () {
    //format forecast api
    var forecastApiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +coordLat + '&lon=' + coordLan + '&exclude=current, minutely,hourly, alerts&appid=0709fe582a3226805c5caaebd2b415a5';
    
    //make fetch request concatenating coordLat and coordLon
    fetch(forecastApiUrl).then(function (response){
        response.json().then(function () {
            console.log(response);
        })
    })
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

    //get city coordinates
    var coordLat = weather.coord.lat;
    var coordLon = weather.coord.lon;
    console.log(coordLat, coordLon);
    
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
 var displayForecast = function() {

 }

// submit event listener - when user clicks Get City formSubmitHandler is activated
userFormEl.addEventListener("submit", formSubmitHandler);
