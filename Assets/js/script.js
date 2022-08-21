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
    return fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +  '&units=imperial&appid=d277d11a67875138e278bf921f539c35')
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