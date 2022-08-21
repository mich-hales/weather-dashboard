let userFormEl = document.querySelector('.search-form');
let searchButton = document.querySelector('.submit-button');
let cityInputEl = document.querySelector('.input-city-element');
let searchResultsContainer = document.querySelector('.search-results-container');
let featuredCityContainer = document.querySelector('.featured-city-container');
let fiveDayForecastContainer = document.querySelector('.five-day-forecast-container');
let clearHistory = document.querySelector('#clear-history');
let searchHistory = document.querySelector('.search-history');


// When button is clicked, the api will search the searched city 
// searchButton.addEventListener('submit', function() {
//     var citySearched = cityInputEl.value.trim();
//     var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearched + '&units=imperial&appid=d277d11a67875138e278bf921f539c35'
    
//     // fetch request to get latitute and longitude of city searched
//     fetch(apiUrl).then(function (response) {
//         response.json()
//         console.log(response.json());
//     })
//     .then(function (data) {
//         console.log(data)

//         // latitude and longitude coordinates of the city searched
//         // let latitude = response.coord.lat;
//         // let longitude = response.coord.lon;

//         // 
//     })

  
// })

var currentDate = document.querySelector('.current-date');
var citySearched = cityInputEl.value.trim();
var apiKey = '300ba1bc4c70b9982f60158a745b8368';
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=denver&units=imperial&appid=d277d11a67875138e278bf921f539c35'
    
fetch(apiUrl).then(function (response) {
    return response.json()
})
.then(function (data) {
    console.log(data)

    // longitude and latitude coordinates of the city searched
    let longitude = data.coord.lon;
    let latitude = data.coord.lat;

    // variables
    let city = data.name;
    var date = moment().format('MM/DD/YYYY');
    currentDate.textContent = date;

    // new openweather api requires longitutde and latitude... returning the fetch request from obtained coordinates
    // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} -- new onecall api after subscribing -- needed for uv index.
    // 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=d277d11a67875138e278bf921f539c35'
    // 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +  '&units=imperial&appid=d277d11a67875138e278bf921f539c35'
    

    // by declaring the content-type: application/json, hoping api will work
    // const options = {
    //     headers: new Headers({"content-type": "application/json"}),
    //     mode: "no-cors",
    // };
    
    return fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=d277d11a67875138e278bf921f539c35')
})
.then(function(response) {
    return response.json()
    .then (function (data) {
        console.log(data);
        displayWeather(data);
    })
})

// display weather 
const displayWeather = function (city) {

    let displayedCity = document.querySelector('.featured-city-header')
    // change the name to featured city
    displayedCity.textContent = city.name;

    // temperature
    let temperature = document.createElement('p');
    temperature.classList.add('current-temperature');
    temperature.textContent = 'Temperature: ' + city.main.temp + '°F';
    featuredCityContainer.appendChild(temperature);

    // humidity
    let humidity = document.createElement('p');
    humidity.classList.add('humidity');
    humidity.textContent = 'Humidity: ' + city.main.humidity + '%';
    featuredCityContainer.appendChild(humidity);

    // wind
    let wind = document.createElement('p');
    wind.textContent = 'Wind Speed: ' + city.wind.speed + 'MPH';
    featuredCityContainer.appendChild(wind);

    // uv-index
    let uvIndex = document.createElement('p');
    // uvindex is deprecated . . . and one call requires a paid subscription ?? 
    // tried subscribing to the onecall api and it still isn't working . . . ???

    var dailyForecast = city.main;
    var today = new Date();

    // // 5 day forecast 
    for (let i = 0; i < 5; i++) {
        var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
        
        var dayDis = document.createElement('p');
        fiveDayForecastContainer.textContent = 'Date:';
        // main.humidity && main.temp
    }

}






// testing list function

// // when text is input (key add event listener)


// fetch(apiUrl)
// .then(response => response.json())
// .then(data => console.log(data))

// .catch(err => alert('Invalid city name'));    


// // the searched city will pop up on the page when search button is clicked
// var listItem = document.createElement('li');
// listItem.classList.add('list-styling');
// searchHistory.appendChild(listItem);
// listItem.textContent = 'testing testing'

// console.log('help')