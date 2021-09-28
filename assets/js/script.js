//variables to store a reference to the <form> element using each id
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
//variables to reference DOM elements
var currentWeatherContainer = document.querySelector('#weatherCurrent');
var forecastContainer = document.querySelector('#forecast-container');


//get user Weather function
var getUserWeather = function (city) {
    //format the weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=0709fe582a3226805c5caaebd2b415a5'

    //make a request to the url concatenating 'city' value
    fetch(apiUrl).then(function (weatherResponse) {
        weatherResponse.json().then(function (data) {
            displayCurrentWeather(data, city);

            //get city coordinates from returend object
            var coordLat = data.coord.lat;
            var coordLon = data.coord.lon;
            console.log(coordLat, coordLon);

            //return fetch request to the one call api with the coordinates 
            return fetch(
                'https://api.openweathermap.org/data/2.5/onecall?lat=' + coordLat + '&lon=' + coordLon + '&units=imperial&exclude=current, minutely,hourly, alerts&appid=0709fe582a3226805c5caaebd2b415a5'
            );
        })
            .then(function (forecastResponse) {
                return forecastResponse.json();
            })
            .then(function (forecastResponse) {
                console.log(forecastResponse);
                displayForecast(forecastResponse);
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

//FUNCTION to display CURRENT WEATHER
var displayCurrentWeather = function (weather) {
    console.log(weather);

    //format forecastDateUnix to regular date
    function convertTimestamp() {
        var unixTimestamp = weather.dt;
        dateObj = new Date(unixTimestamp * 1000);
        utcString = dateObj.toUTCString();
        currentDate = dateObj.toLocaleDateString();

    }
    convertTimestamp();

    //format weather info
    var cityInfo = weather.name + '(' + currentDate + ')';
    console.log(cityInfo);

    //format today's weather info
    var tempInfo = weather.main.temp;
    var windInfo = weather.wind.speed;
    var humInfo = weather.main.humidity;
    //UV info here

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
    todaysWeatherInfoEl.textContent = 'Temp: ' + tempInfo + 'Wind: ' + windInfo + 'Humidity: ' + humInfo;

    //append to currentWeatherContainer DOM
    currentWeatherContainer.appendChild(todaysWeatherInfoEl);
}
//FUNCTION to display forecast weather
var displayForecast = function (forecastArr) {

    //clear old content
    forecastContainer.textContent = "";



    //loop over forecast days max 5
    for (var i = 1; i < 6; i++) {
        //create variable to hold temp,wind,humidity, date
        var forecastTemp = "Temp: " + forecastArr.daily[i].temp.day;
        var forecastWind = "Wind: " + forecastArr.daily[i].wind_speed;
        var forecastHum = "Humidity: " + forecastArr.daily[i].humidity;
        //format forecastDateUnix to regular date
        function convertTimestamp() {
            var unixTimestamp = forecastArr.daily[i].dt;
            dateObj = new Date(unixTimestamp * 1000);
            utcString = dateObj.toUTCString();
            forecastDate = dateObj.toLocaleDateString();

        }
        convertTimestamp();

        console.log(forecastDate, forecastTemp, forecastWind, forecastHum);

        // //create a container for each forecast day
        var forecastEl = document.createElement("div");
        forecastEl.classList = "flex-row justify-space-between align-center";

        // //create a span element for date
        var dateEl = document.createElement("span");
        dateEl.textContent = forecastDate;

        // //append to container
        forecastEl.appendChild(dateEl);

        // //create icon element
        // var iconEl = document.createElement("span");
        // //insert icon

        // //append to container
        // forecastEl.appendchile(iconEl);

        //create div element for weather details
        var forecastInfoEl = document.createElement("div");
        forecastInfoEl.textContent = forecastTemp + forecastWind + forecastHum;

        //append forecastInfoEl to forecastEl container
        forecastEl.appendChild(forecastInfoEl);

        //append forecastEl to forecastContainer
        forecastContainer.appendChild(forecastEl);



    }
}

// submit event listener - when user clicks Get City formSubmitHandler is activated
userFormEl.addEventListener("submit", formSubmitHandler);
