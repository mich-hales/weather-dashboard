let userFormEl = document.querySelector('.search-form');
let searchButton = document.querySelector('.submit-button');
let cityInputEl = document.querySelector('.input-city-element');
let searchResultsContainer = document.querySelector('.search-results-container');
let featuredCityContainer = document.querySelector('.featured-city-container');
let fiveDayForecastContainer = document.querySelector('.five-day-forecast-container');
let clearHistory = document.querySelector('#clear-history');
let searchHistoryList = document.querySelector('.search-history');
let cityForm = document.querySelector('#city-form');



// array for search history
let searchHistory = [];
console.log(searchHistory)

// save search history 
let formSubmitHandler = function (event) {
    event.preventDefault();

    // the user input / searched city
    var citySearched = cityInputEl.value.trim();
    console.log(citySearched)

    // searchHistory array is not working . . . push isn't working? ? ? 


    // local storage
    if (citySearched) {
        console.log(searchHistory);
        console.log(citySearched);
        searchHistory.push(citySearched);
        localStorage.setItem('search-history', JSON.stringify(searchHistory));
        let searchHistoryBtn = document.createElement('button');
        searchHistoryBtn.classList.add('search-history-buttons');
        searchHistoryBtn.setAttribute('data-city', citySearched);
        searchHistoryBtn.textContent = citySearched;
        searchHistoryList.appendChild(searchHistoryBtn);
        // calls the weatherInfo function and inputs the searched city as an argument
        weatherInfo(citySearched);
        // resets search container back to empty
        cityInputEl.value = '';
    } else {
        alert('Enter a City Name');
    }
}


var currentDate = document.querySelector('.current-date');
var currentWeatherIcon = document.querySelector('.featured-weather-icon');
var displayedCity = document.querySelector('.featured-city-header')


var apiKey = '300ba1bc4c70b9982f60158a745b8368';
// 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearched + '&units=imperial&appid=300ba1bc4c70b9982f60158a745b8368'

let weatherInfo = function(citySearched) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearched + '&units=imperial&appid=300ba1bc4c70b9982f60158a745b8368'

    console.log(apiUrl);

    fetch(apiUrl).then(function (cityResponse) {
        return cityResponse.json()
    })
    .then(function (cityResponse) {
        console.log(cityResponse)
    
        // longitude and latitude coordinates of the city searched
        let longitude = cityResponse.coord.lon;
        let latitude = cityResponse.coord.lat;
    
        // variables
        let city = cityResponse.name;
        var date = moment().format('MM/DD/YYYY');
        // get weather icon
        let weatherIcon = cityResponse.weather[0].icon;
        let showIcon = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png'/>"

        // resetting current weather info for new 
        featuredCityContainer.textContent = '';
        fiveDayForecastContainer.textContent = '';

        // displays city, date and icon on page
        displayedCity.textContent = city.name;
        currentDate.textContent = date;
        currentWeatherIcon.textContent = showIcon;
      

        // new openweather api requires longitutde and latitude... returning the fetch request from obtained coordinates
        // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} -- new onecall api after subscribing -- needed for uv index.
        // 'https://api.openweathermap.org/data/3.0/onecall?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=d277d11a67875138e278bf921f539c35'
        // 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +  '&units=imperial&appid=d277d11a67875138e278bf921f539c35'
        
    
        // by declaring the content-type: application/json, hoping api will work
        // const options = {
        //     headers: new Headers({"content-type": "application/json"}),
        //     mode: "no-cors",
        // };


        // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
        // this is the 5 day forecast api . . . 

        console.log('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude +  '&units=imperial&appid=d277d11a67875138e278bf921f539c35')
        
        // taking latitude and longitutde from city searched and returning a fetch request
        return fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude +  '&units=imperial&appid=d277d11a67875138e278bf921f539c35')
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        // calls the displayWeather function to display content
        displayWeather(response);
    })
};



// display weather 
const displayWeather = function (cityWeather) {

    // temperature
    let temperature = document.createElement('p');
    temperature.classList.add('current-temperature');
    temperature.textContent = 'Temperature: ' + cityWeather.list[0].main.temp + '°F';
    // temperature.textContent = 'Temperature: ' + city.current.temp.toFixed(1) + '°F';
    featuredCityContainer.appendChild(temperature);

    // humidity
    let humidity = document.createElement('p');
    humidity.classList.add('humidity');
    humidity.textContent = 'Humidity: ' + cityWeather.list[0].main.humidity + '%';
    // humidity.textContent = 'Humidity: ' + city.current.humidity + '%';
    featuredCityContainer.appendChild(humidity);

    // wind
    let wind = document.createElement('p');
    wind.textContent = 'Wind Speed: ' + cityWeather.list[0].wind.speed + 'MPH';
    // wind.textContent = 'Wind Speed: ' + city.current.wind_speed + 'MPH';
    featuredCityContainer.appendChild(wind);




    // not sure what to call in the api . . . 
    var dailyForecast = cityWeather.list;
    console.log(dailyForecast);

    // // 5 day forecast 
    for (let i = 3; i < dailyForecast.length; i = i + 8) {
        var temp = dailyForecast[i].main.temp;
        dailyForecast[i].dt_txt;
        console.log(dailyForecast[i].main.temp)
        console.log(dailyForecast[i].dt_txt)

        var test = document.createElement('p');
        test.textContent = temp;
        fiveDayForecastContainer.appendChild(test);
    }  
        
    
    
    
    
    // is dt_txt going to get me the date?
        // forecastDate[i] = dailyForecast.list[i].dt_txt;
        // forecastIcon[i] = dailyForecast[i].weather[0].icon;
   
        // forecastWind[i] = dailyForecast[i].wind.speed;
        // forecastHum[i] = dailyForecast[i].main.humidity;

        



    //     displayElement.innerHTML = '<p>' + date + '</p>' +
    //     '<p>' + showIcon +'</p>' +
    //     '<p>Temp: ' + dailyForecast[i].temp.day.toFixed(1) + '°F</p>' +
    //     '<p>Humidity: ' + dailyForecast[i].humidity + '%</p>' +
    //     '<p>Wind: ' + dailyForecast[i].wind_speed +'MPH</p>' 
    // // append to page
    // fiveDayForecastContainer.appendChild(displayElement); 



    // var today = new Date();
    // console.log(today);


    //     // displays date -- for the next 5 days
    //     var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
    //     // displays icon for current condition (URL is http://openweathermap.org/img/wn/10d@2x.png -- example code on openweather to retrieve icons)
    //     var showIcon = "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'/>"
    //     var displayElement = document.createElement('div');
    
}




    // IF I'm able to use the opencall api, I looked up the data and figured this is how it would work. . . but the api isn't working still
    // still need to test it to see if it works properly 


    // uv-index
    // let uvIndex = document.createElement('p');
    // let uvIndexVal = cityWeather.current.uvi.toFixed(1);
    // if (uvIndexVal >= 0) {
    //     uvIndex.classList.add('uv-green');
    // } else if (uvIndexVal >=3) {
    //     uvIndex.classList.add('uv-yellow');
    // } else if (uvIndexVal >= 8) {
    //     uvIndex.classList.add('uv-green');
    // }
    // uvIndex.innerHTML = 'UV Index: <span>' + uvIndexVal + '</span>';
    // featuredCityContainer.appendChild(uvIndex);

    // uvindex is deprecated . . . and one call requires a paid subscription ?? 
    // tried subscribing to the onecall api and it still isn't working . . . ???




// this is how I would be able to present the 5 day forecast, but the opencall api still isn't working and not sure how to do it without it.
// haven't been able to test it cuz the api isn't working so still not sure if it will work properly . . . 

    // var dailyForecast = cityWeather.daily;
    // var today = new Date();

    // // // 5 day forecast 
    // for (let i = 0; i < dailyForecast.length; i++) {
    //     // displays date -- for the next 5 days
    //     var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
    //     // retrieves info to get icon for current weather condition
    //     var icon = dailyForecast[i].weather[0].icon;
    //     // displays icon for current condition (URL is http://openweathermap.org/img/wn/10d@2x.png -- example code on openweather to retrieve icons)
    //     var showIcon = "<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'/>"
    //     var displayElement = document.createElement('div');
    //     displayElement.innerHTML = '<p>' + date + '</p>' +
    //         '<p>' + showIcon +'</p>' +
    //         '<p>Temp: ' + dailyForecast[i].temp.day.toFixed(1) + '°F</p>' +
    //         '<p>Humidity: ' + dailyForecast[i].humidity + '%</p>' +
    //         '<p>Wind: ' + dailyForecast[i].wind_speed +'MPH</p>' 
    //     // append to page
    //     fiveDayForecastContainer.appendChild(displayElement); 
    // }  







// show history of searched cities
let showHistory = function() {
    // referencing the array created at the beginning 
    searchHistory = JSON.parse(localStorage.getItem('search-history'));
   
    if (searchHistory) {
        searchHistory = JSON.parse(localStorage.getItem('search-history'));
        
        // Creating buttons for the search history 
        for (let i = 0; i < searchHistory.length; i++) {
            let searchHistoryBtn = document.createElement('button');
            searchHistoryBtn.classList.add('search-history-buttons');
            searchHistoryBtn.setAttribute('data-city', searchHistory[i]);
            searchHistoryBtn.textContent = searchHistory[i];
            searchHistoryList.appendChild(searchHistoryBtn);
        }
    }
}


// if a button in search history is clicked, the weather of that city will display from the local storage
let historyButtonSearch = function (event) {
    // retrieving the data attribute created at the beginning (the city name will be the attribute)
    let cityHistory = event.target.getAttribute('data-city');
    // if the city in the search history is clicked (which is saved in the data-attribute) it will display it's weather info back onto the page
    if (cityHistory) {
        weatherInfo(cityHistory);
    }
}


// will this properly remove the buttons from page? 




// show clear history buttons

// clear search history from local storage
let clearHistoryButton = function () {
    localStorage.removeItem('search-history');
}


// why does submit button not work?


// when city is searched and the search button is clicked, will call the formSubmitHandler function which initiates everything
cityForm.addEventListener('submit', formSubmitHandler);
// when a previously searched city's button is clicked on, will call the historyButtonSearch function
searchHistoryList.addEventListener('click', historyButtonSearch);
// when the clear history's button is clicked on, will call ClearHistoryButton function
clearHistory.addEventListener('click', clearHistoryButton);

// displays search history on the page
showHistory();