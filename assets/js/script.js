var search = document.querySelector(".search");
var searchBar = document.querySelector(".searchBar");
var searchBtn = document.querySelector(".searchBtn");
var searchHistory = document.querySelector(".searchHistory");
var currentForecast = document.querySelector(".currentForecast");
var currentCard = document.querySelector(".currentCard");
var futureForecast = document.querySelector(".futureForecast");
var forecastCard = document.querySelector(".forecastCard");
var key = '6ed725886cc218c6ea1bf1fcf160a3de';

function fetchCurrentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
    });
};

searchBtn.addEventListener("click", function() {
    var city = searchBar.value;
    localStorage.setItem("city", JSON.stringify(city));
    fetchCurrentWeather(city);
});