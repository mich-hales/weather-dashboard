let userFormEl = document.querySelector('.search-form');
let searchButton = document.querySelector('.submit-button');
let cityInputEl = document.querySelector('.input-city-element');
let searchResultsContainer = document.querySelector('.search-results-container');
let featuredCityContainer = document.querySelector('.featured-city-container');
let fiveDayForecastContainer = document.querySelector('.five-day-forecast-container');


// When button is clicked, the api will search the searched city 
searchButton.addEventListener('submit', function() {
    var citySearched = cityInputEl.value.trim();
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearched + '&limit=5&appid=d277d11a67875138e278bf921f539c35'
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => console.log(data))
    
    .catch(err => alert('Invalid city name'));    
})



