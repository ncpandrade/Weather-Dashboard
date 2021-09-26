//create a variable called 'city' to be used in api Url
// var city = document.querySelector('#cityname').value;
// console.log(city);

//get user City function
var getUserWeather = function() {
    //format the weather api url
    var apiUrl = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0709fe582a3226805c5caaebd2b415a5'
    
    //make a request to the url concatenating 'city' value
    fetch(apiUrl)
        .then(function(response) {
             return response.json();
    })
        .then(function(response) {
             console.log(response.data[0]);
        });
}
//variables to store a reference to the <form> element using each id
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");

//Function to obtain city input on button click
var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();
    console.log(city);
    //check if citiname was entered
    if (city) {
        //if yes, pass username into getUserRepos()
        getUserWeather(city);
        //clear value from the <input> element
        nameInputEl.value = "";
}   else {
        alert("Please enter a City name");
}
    console.log(event);
};

// submit event listener - when user clicks Get City formSubmitHandler is activated
userFormEl.addEventListener("submit", formSubmitHandler);


    //     //using fetch's .ok functionality to check if a username exists
    //     if (response.ok) {
    //       response.json().then(function(data) {
    //         console.log(data);
    //       });
    //     } else {
    //       alert("Error: GitHub User Not Found");
    //     }
    //   })


    //     }

