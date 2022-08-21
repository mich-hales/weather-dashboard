let userFormEl = document.querySelector('.search-form');
let searchButton = document.querySelector('.submit-button');
let cityInputEl = document.querySelector('.input-city-element');
let searchResultsContainer = document.querySelector('.search-results-container');
let featuredCityContainer = document.querySelector('.featured-city-container');
let fiveDayForecastContainer = document.querySelector('.five-day-forecast-container');
let clearHistory = document.querySelector('#clear-history');
let searchHistoryList = document.querySelector('.search-history');


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
    // temperature.textContent = 'Temperature: ' + city.main.temp + '°F';
    temperature.textContent = 'Temperature: ' + city.current.temp.toFixed(1) + '°F';
    featuredCityContainer.appendChild(temperature);

    // humidity
    let humidity = document.createElement('p');
    humidity.classList.add('humidity');
    // humidity.textContent = 'Humidity: ' + city.main.humidity + '%';
    humidity.textContent = 'Humidity: ' + city.current.humidity + '%';
    featuredCityContainer.appendChild(humidity);

    // wind
    let wind = document.createElement('p');
    // wind.textContent = 'Wind Speed: ' + city.wind.speed + 'MPH';
    wind.textContent = 'Wind Speed: ' + city.current.wind_speed + 'MPH';
    featuredCityContainer.appendChild(wind);

    // uv-index
    let uvIndex = document.createElement('p');
    let uvIndexVal = city.current.uvi.toFixed(1);
    if (uvIndexVal >= 0) {
        uvIndex.classList.add('uv-green');
    } else if (uvIndexVal >=3) {
        uvIndex.classList.add('uv-yellow');
    } else if (uvIndexVal >= 8) {
        uvIndex.classList.add('uv-green');
    }
    uvIndex.innerHTML = 'UV Index: <span>' + uvIndexVal + '</span>';
    featuredCityContainer.appendChild(uvIndex);

    // uvindex is deprecated . . . and one call requires a paid subscription ?? 
    // tried subscribing to the onecall api and it still isn't working . . . ???

    var dailyForecast = city.daily;
    var today = new Date();

    // // 5 day forecast 
    for (let i = 0; i < dailyForecast.length; i++) {
        // displays date -- for the next 5 days
        var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
        // retrieves info to get icon for current weather condition
        var icon = dailyForecast[i].weather[0].icon;
        // displays icon for current condition (URL is http://openweathermap.org/img/wn/10d@2x.png -- example code on openweather to retrieve icons)
        var showIcon = "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'/>"
        var displayElement = document.createElement('div');
        displayElement.innerHTML = '<p>' + date + '</p>' +
            '<p>' + showIcon +'</p>' +
            '<p>Temp: ' + dailyForecast[i].temp.day.toFixed(1) + '°F</p>' +
            '<p>Humidity: ' + dailyForecast[i].humidity + '%</p>' +
            '<p>Wind: ' + dailyForecast[i].wind_speed +'MPH</p>' 
        // append to page
        fiveDayForecastContainer.appendChild(displayElement); 
    }  
}



var searchHistory = [];
// save search history 
let formSubmitHandler = function (event) {
    event.preventDefault();

    // the user input / searched city
    var city = cityInputEl.value.trim();

    // local storage
    if (city) {
        searchHistory.push(city);
        localStorage.setItem('Search History:', JSON.stringify(searchHistory));
        let searchHistoryBtn = document.createElement('button');
        searchHistoryBtn.classList.add('search-history-buttons');
        searchHistoryBtn.setAttribute('data-city', city);
        searchHistoryBtn.textContent = city;
        searchHistoryList.appendChild(searchHistoryBtn);
        // display searched city's info
        displayWeather(city);
        // resets search container back to empty
        cityInputEl.value = '';
    } else {
        alert('Enter a City Name');
    }
}


// show history of searched cities
let showHistory = function() {
    
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