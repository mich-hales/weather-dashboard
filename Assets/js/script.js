let userFormEl = document.querySelector('.search-form');
let searchButton = document.querySelector('.submit-button');
let cityInputEl = document.querySelector('.input-city-element');
let searchResultsContainer = document.querySelector('.search-results-container');
let featuredCityContainer = document.querySelector('.featured-city-container');
let clearHistory = document.querySelector('#clear-history');
let searchHistoryList = document.querySelector('.search-history');
let cityForm = document.querySelector('#city-form');
let fiveDayForecastContainer = document.querySelector('.five-day-forecast-container');



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


// var currentDate = document.querySelector('#current-date');
var currentWeatherIcon = document.querySelector('#featured-weather-icon');
var displayedCity = document.querySelector('.featured-city-header')

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

        // resetting current weather info for new data
        featuredCityContainer.textContent = '';
        fiveDayForecastContainer.textContent = '';
        
        // display name of city
        let cityName = document.createElement('h3');
        cityName.textContent = cityResponse.name;
        cityName.style.margin = '10px 0 0 30px'
        displayedCity.appendChild(cityName);

        // display date
        let displayDate = document.createElement('h3');
        displayDate.textContent = moment().format('M/DD/YYYY');
        displayDate.style.margin = '10px 0 0 10px';
        displayedCity.appendChild(displayDate);

        // display icon
        let currentIcon = document.createElement('img');
        let weatherIcon = cityResponse.weather[0].icon;
        currentIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
        currentWeatherIcon.append(currentIcon);

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
    temperature.textContent = 'Temperature: ' + cityWeather.list[0].main.temp + ' °F';
    temperature.style.margin = '0 0 5px 10px'
    featuredCityContainer.appendChild(temperature);

    // humidity
    let humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + cityWeather.list[0].main.humidity + ' %';
    humidity.style.margin = '0 0 5px 10px'
    featuredCityContainer.appendChild(humidity);

    // wind
    let wind = document.createElement('p');
    wind.textContent = 'Wind Speed: ' + cityWeather.list[0].wind.speed + ' MPH';
    wind.style.margin = '0 0 10px 10px'
    featuredCityContainer.appendChild(wind);



    var dailyForecast = cityWeather.list;
    console.log(dailyForecast);

    // 5 day forecast (starts on the 3rd list item -- puts the time at noon for every day)
    for (let i = 3; i < dailyForecast.length; i = i + 8) {
        // gathering data from the 5 day forecast api
        var fiveDayTemp = dailyForecast[i].main.temp;
        var fiveDayDate = dailyForecast[i].dt_txt;
        var fiveDayIcon = dailyForecast[i].weather[0].icon;
        var fiveDayWind = dailyForecast[i].wind.speed;
        var fiveDayHumidity = dailyForecast[i].main.humidity;


        // creates a container for all elements to display
        let container = document.createElement('div');
        container.style.border = '2px solid black';
        container.style.margin = '10px';
        fiveDayForecastContainer.appendChild(container);
        

        // creates the date element and appends to page
        var dateEl = document.createElement('h6');
        var momentEl = moment(fiveDayDate).format('M/DD/YYYY');
        dateEl.textContent = momentEl;
        container.appendChild(dateEl);
        
        // creates the weather icon and appends to page
        var iconEl = document.createElement('img');
        iconEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + fiveDayIcon + '@2x.png')
        container.appendChild(iconEl);

        // creates the temp element and appends to page
        var tempEl = document.createElement('p');
        tempEl.textContent = 'Temp: ' + fiveDayTemp + ' °F';
        container.appendChild(tempEl);

        // creates the wind speed element and appends to page
        var windEl = document.createElement('p');
        windEl.textContent = 'Wind: ' + fiveDayWind + ' MPH';
        container.appendChild(windEl);

        // creates the humidity element and appends to page
        var humidityEl = document.createElement('p');
        humidityEl.textContent = 'Humidity: ' + fiveDayHumidity + ' %';
        container.appendChild(humidityEl);
    }  
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