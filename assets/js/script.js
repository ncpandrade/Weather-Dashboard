//get user City function
var getUserCity = function(city) {
    //format the weather api url
    var apiUrl = 'api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=0709fe582a3226805c5caaebd2b415a5'
    
    //create a variable called 'city' to be used in api Url
    var city = document.querySelector('#cityname').value;
   
    //make a request to the url concatenating 'city' value
    fetch(apiUrl)
        .then(function(response) {
             return response.json();
    })
        .then(function(response) {
             console.log(response.data[0]);
        });
}

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
    
