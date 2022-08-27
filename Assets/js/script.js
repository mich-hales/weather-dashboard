var userFormEl = document.querySelector('.search-form');
var searchButton = document.querySelector('.submit-button');
var cityInputEl = document.querySelector('.input-city-element');
var searchResultsContainer = document.querySelector('.search-results-container');
var featuredCityContainer = document.querySelector('.featured-city-container');
var searchHistoryList = document.querySelector('.search-history');
var cityForm = document.querySelector('#city-form');
var fiveDayForecastContainer = document.querySelector('.five-day-forecast-container');



// array for search history
var searchHistory = [];
console.log(searchHistory)

// save search history 
var formSubmitHandler = function (event) {
    event.preventDefault();

    // the user input / searched city
    var citySearched = cityInputEl.value.trim();
    console.log(citySearched)

    // local storage
    if (citySearched) {
        searchHistory.push(citySearched);
     
        localStorage.setItem('weather-search', JSON.stringify(searchHistory));
        let searchHistoryBtn = document.createElement('button');
        searchHistoryBtn.classList.add('search-history-buttons');
        searchHistoryBtn.setAttribute('data-city', citySearched);
        searchHistoryBtn.textContent = citySearched;
        searchHistoryList.appendChild(searchHistoryBtn);
        searchHistoryList.removeAttribute('style');

        // calls the weatherInfo function and inputs the searched city as an argument
        weatherInfo(citySearched);
        // resets search container back to empty
        cityInputEl.value = '';
    } else {
        alert('Enter a City Name');
    }
}


var currentWeatherIcon = document.querySelector('#featured-weather-icon');
var displayedCity = document.querySelector('.featured-city-header')
var containerFeaturedCity = document.querySelector('.featured-city');
var containerFeaturedForecast = document.querySelector('.five-day-forecast');

var weatherInfo = function(citySearched) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearched + '&units=imperial&appid=300ba1bc4c70b9982f60158a745b8368'

    console.log(apiUrl);

    fetch(apiUrl).then(function (cityResponse) {
        return cityResponse.json()
    })
    .then(function (cityResponse) {
        console.log(cityResponse)
    
        // longitude and latitude coordinates of the city searched
        var longitude = cityResponse.coord.lon;
        var latitude = cityResponse.coord.lat;

        // resetting current weather info for new data
        featuredCityContainer.textContent = '';
        fiveDayForecastContainer.textContent = '';
        displayedCity.textContent = '';
        currentWeatherIcon.textContent = '';

        // display name of city
        var cityName = document.createElement('h3');
        cityName.textContent = cityResponse.name;
        cityName.style.margin = '10px 0 0 30px'
        cityName.style.fontWeight = 'bold';
        displayedCity.appendChild(cityName);

        // display date
        var displayDate = document.createElement('h3');
        displayDate.textContent = moment().format('M/DD/YYYY');
        displayDate.style.margin = '10px 0 0 10px';
        displayDate.style.fontWeight = 'bold';
        displayedCity.appendChild(displayDate);

        // display icon
        var currentIcon = document.createElement('img');
        var weatherIcon = cityResponse.weather[0].icon;
        currentIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png');
        currentWeatherIcon.append(currentIcon);

        // display containers
        containerFeaturedCity.classList.remove('hide');
        containerFeaturedForecast.classList.remove('hide');

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
    var temperature = document.createElement('p');
    temperature.innerHTML = '<strong>Temperature: </strong>' + cityWeather.list[0].main.temp + ' °F';
    temperature.style.margin = '0 0 5px 15px'
    featuredCityContainer.appendChild(temperature);

    // humidity
    var humidity = document.createElement('p');
    humidity.innerHTML =  '<strong>Humidity: </strong>' + cityWeather.list[0].main.humidity + ' %';
    humidity.style.margin = '0 0 5px 15px'
    featuredCityContainer.appendChild(humidity);

    // wind
    var wind = document.createElement('p');
    wind.innerHTML =  '<strong>Wind: </strong>' + cityWeather.list[0].wind.speed + ' MPH';
    wind.style.margin = '0 0 5px 15px'
    featuredCityContainer.appendChild(wind);

    // redeclaring coordinates to fetch the UV Index data
    var uvLat = cityWeather.city.coord.lat;
    var uvLon = cityWeather.city.coord.lon;
    var UVindexAPI = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + uvLat + '&lon=' + uvLon + '&APPID=d277d11a67875138e278bf921f539c35';
   
    fetch(UVindexAPI)
    .then(function(response){
        return response.json()
    })
    .then(function(response) {
        // display UV Index results and color code it depending on number
        var uvResult = document.createElement('p');
        var spanUvi = document.createElement('span');
        var uvi = response.value;
    
        if (uvi <= 3) {
            spanUvi.classList.add('uv-green');
        } else if (uvi >= 3 && uvi <=6) {
            spanUvi.classList.add('uv-yellow');
        } else if (uvi >=6 && uvi <=8) {
            spanUvi.classList.add('uv-orange');
        } else if (uvi >=8) {
            spanUvi.classList.add('uv-red');
        }
           
        uvResult.innerHTML = '<strong>UV Index: </strong>'
        spanUvi.innerHTML = uvi;
        uvResult.style.margin = '0 0 5px 15px';
        spanUvi.style.padding = '5px 10px';
        spanUvi.style.borderRadius = '5px';
        featuredCityContainer.appendChild(uvResult);
        uvResult.appendChild(spanUvi);
    })

    


    var dailyForecast = cityWeather.list;
    console.log(dailyForecast);

    // 5 day forecast
    for (let i = 0; i < dailyForecast.length; i = i + 8) {
        // gathering data from the 5 day forecast api
        var fiveDayTemp = dailyForecast[i].main.temp;
        var fiveDayDate = dailyForecast[i].dt_txt;
        var fiveDayIcon = dailyForecast[i].weather[0].icon;
        var fiveDayWind = dailyForecast[i].wind.speed;
        var fiveDayHumidity = dailyForecast[i].main.humidity;


        // creates a container for all elements to display
        var container = document.createElement('div');
        container.style.border = '2px solid black';
        container.style.borderRadius = '5px';
        container.style.margin = '10px';
        container.style.backgroundColor = 'rgb(227, 244, 254)'
        fiveDayForecastContainer.appendChild(container);
        

        // creates the date element and appends to page
        var dateEl = document.createElement('h6');
        var momentEl = moment(fiveDayDate).format('M/DD/YYYY');
        dateEl.textContent = momentEl;
        container.appendChild(dateEl);
        
        // creates the weather icon and appends to page
        var iconEl = document.createElement('img');
        iconEl.setAttribute('src', 'https://openweathermap.org/img/wn/' + fiveDayIcon + '@2x.png')
        container.appendChild(iconEl);

        // creates the temp element and appends to page
        var tempEl = document.createElement('p');
        tempEl.innerHTML =  '<strong>Temp: </strong>' + fiveDayTemp + ' °F';
        container.appendChild(tempEl);

        // creates the wind speed element and appends to page
        var windEl = document.createElement('p');
        windEl.innerHTML =  '<strong>Wind: </strong>' + fiveDayWind + ' MPH';
        container.appendChild(windEl);

        // creates the humidity element and appends to page
        var humidityEl = document.createElement('p');
        humidityEl.innerHTML =  '<strong>Humidity: </strong>' + fiveDayHumidity + ' %';
        container.appendChild(humidityEl);
    }  
}


// show history of searched cities
var showHistory = function() {
    // referencing the array created at the beginning 
    searchHistory = JSON.parse(localStorage.getItem('weather-search'));
   
    if (searchHistory) {
        searchHistory = JSON.parse(localStorage.getItem('weather-search'));
        
        // Creating buttons for the search history 
        for (let i = 0; i < searchHistory.length; i++) {
            var searchHistoryBtn = document.createElement('button');
            searchHistoryBtn.classList.add('search-history-buttons');
            searchHistoryBtn.setAttribute('data-city', searchHistory[i]);
            searchHistoryBtn.textContent = searchHistory[i];
            searchHistoryList.appendChild(searchHistoryBtn);
            searchHistoryList.removeAttribute('style');
        }
    }
}


// if a button in search history is clicked, the weather of that city will display from the local storage
var historyButtonSearch = function (event) {
    // retrieving the data attribute created at the beginning (the city name will be the attribute)
    let cityHistory = event.target.getAttribute('data-city');
    // if the city in the search history is clicked (which is saved in the data-attribute) it will display it's weather info back onto the page
    if (cityHistory) {
        weatherInfo(cityHistory);
    }
}

// when city is searched and the search button is clicked, will call the formSubmitHandler function which initiates everything
cityForm.addEventListener('submit', formSubmitHandler);
// when a previously searched city's button is clicked on, will call the historyButtonSearch function
searchHistoryList.addEventListener('click', historyButtonSearch);
// calls showHistory function
// showHistory();