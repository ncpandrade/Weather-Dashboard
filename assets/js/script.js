
//get user City function
var getUserWeather = function (city) {
    //format the weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0709fe582a3226805c5caaebd2b415a5'

    //make a request to the url concatenating 'city' value
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        });
}
//variables to store a reference to the <form> element using each id
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
//variables to reference DOM elements
var currentWeatherContainer = document.querySelector('#current-weather-container');
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
//clear old content from container
currentWeatherContainer.textContent = "";

//FUNCTION to display weather
var displayCurrentWeather = function (weather) {
    console.log(weather);
    console.log(city);

    //format weather info
    var cityInfo = weather[i].name;

    //create conatiner for current weather
    var currentCityEl = document.createElement("div");
    currentWeatherContainer.classList = "list-item flex-row justify-space-between align-center";


}

// submit event listener - when user clicks Get City formSubmitHandler is activated
userFormEl.addEventListener("submit", formSubmitHandler);


        // //using fetch's .ok functionality to check if a username exists
        // if (response.ok) {
        //   response.json().then(function(data) {
        //     console.log(data);
        //   });
        // } else {
        //   alert("Error: GitHub User Not Found");
        // }



    //     }

