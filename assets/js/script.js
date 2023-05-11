let searchForm = document.getElementById("searchForm");
let searchInput = document.getElementById("searchInput");
let current = document.getElementById("current");
let forecast = document.getElementById("forecast");
let searchHistory = document.getElementById("searchHistory");

let APIKey = '6ed725886cc218c6ea1bf1fcf160a3de';

// let cityName = "Pensacola";
// let cityQuery =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     cityName +
//     "&appid=" +
//     APIKey;

// let forecastQuery =
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//     cityName +
//     "&appid=" +
//     APIKey;

// fetch(cityQuery)
//     .then(function (res) {
//         return res.json();
//     })
//     .then(function (data) {
//         console.log(data.list);
//     });

let storedSearches;

function renderLocalStorage () {
    searchHistory.innerHTML = "";

    for (let i = 0; i < storedSearches.length; i++) {
        let searchHistoryDiv = document.createElement("div");
        searchHistoryDiv.className = "searchHistoryDiv";
    
        let searchHistoryBtn = document.createElement("button");
        searchHistoryBtn.textContent = storedSearches[i];
        searchHistoryDiv.append(searchHistoryBtn);
        searchHistory.append(searchHistoryBtn);
        }
    }
    
    function getLocalStorage () {
        storedSearches = [];
        storedSearches = JSON.parse(localStorage.getItem("searches")) || []; //------- ||= "or"
        renderLocalStorage();
    }
    
    getLocalStorage();


function renderCurrentWeather(data) {

    let name = document.createElement("div");
    name.textContent = data.name;
    current.append(name);

    let date = document.createElement("div");
    date.textContent = new Date(data.dt *1000).toLocaleTimeString("en-US", {weekday:"long", year: "numeric", month: "short", day: "numeric"});
    current.append(date);

    let temp = document.createElement("div");
    temp.textContent = data.main.temp;
    current.append(temp);

    let humidity = document.createElement("div");
    humidity.textContent = data.main.humidity;
    current.append(humidity);

    let windSpeed = document.createElement("div");
    windSpeed.textContent = data.wind.speed;
    current.append(windSpeed);

    let icon = document.createElement("img");
    icon.src = 
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
    current.append(icon);

}

function displayCurrent(name) {
    let cityName = name;
    let cityQuery =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName + 
        "&units=imperial" +
        "&appid=" +
        APIKey;

    fetch(cityQuery)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            renderCurrentWeather(data);
        })
        .catch(function (err) {
            console.log(err);
        });
};


let forecastHigh = -100;

let forecastLow = 200;

let avgWindSpeed = 0;

let avgHumidity = 0;

let forecastIconSrc;



function renderForecast (data) {
    let infoIndex = [7, 15, 23, 31, 39];
    for (let i = 0; i < data.list.length; i++) {
let forecastCard = document.createElement("div");
let forecastIcon = document.createElement("img");

if(data.list[i].main.temp_max > forecastHigh) {
    forecastHigh = data.list[i].main.temp_max
}
if(data.list[i].main.temp_min > forecastLow) {
    forecastLow = data.list[i].main.temp_min
}

avgHumidity = avgHumidity + data.list[i].main.humidity;

avgWindSpeed = avgWindSpeed + data.list[i].main.windSpeed;

if(infoIndex.includes(i)) {
    console.log("i", i);

    hiTemp = document.createElement("div");
    hiTemp.textContent = "High: " + forecastHigh;
    forecastCard.append(highTemp);
    forecastHigh = -100;

    lowTemp = document.createElement("div");
    lowTemp.textContent = "Low: " + forecastLow;
    forecastCard.append(lowTemp);
    forecastLow = 200;

    humidity = document.createElement("div");
    humidity.textContent = "Humidity: " + avgHumidity;
    forecastCard.append(humidity);
    avgHumidity = 0;

    windSpeed = document.createElement("div");
    windSpeed.textContent = "Wind: " + avgWindSpeed;
    forecastCard.append(windSpeed);
    avgWindSpeed = 0;

    hiTemp = document.createElement("div");
    hiTemp.textContent = "High: " + forecastHigh;
    forecastCard.append(hiTemp);
    forecastHigh = -100;

}
      
}};




function displayForecast (name) {
    let forecastQuery = name;
    let cityQuery =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityName + 
        "&units=imperial" +
        "&appid=" +
        APIKey;

    fetch(forecastQuery)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            renderForecast(data);
        })
        .catch(function (err) {
            console.log(err);
        });
};

function searchCity(e) {
    e.preventDefault();
    displayCurrent(searchInput.value);
    displayForecast(searchInput.value);
};


searchForm.addEventListener("submit", searchCity)


// var search = document.querySelector(".search");
// var searchBar = document.querySelector(".searchBar");
// var searchBtn = document.querySelector(".searchBtn");
// var searchHistory = document.querySelector(".searchHistory");
// var currentForecast = document.querySelector(".currentForecast");
// var currentCard = document.querySelector(".currentCard");
// var futureForecast = document.querySelector(".futureForecast");
// var forecastCard = document.querySelector(".forecastCard");
// var key = '6ed725886cc218c6ea1bf1fcf160a3de';

// function fetchCurrentWeather(city) {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`)
//     .then((res) => {
//         return res.json();
//     })
//     .then((data) => {
//         console.log(data);
//         var currentTemp = document.createElement("h4")
//         currentTemp.innerHTML = `Temp: ${data.main.temp}  &#176F`
//         currentCard.append(currentTemp)
//     });
// };

// searchBtn.addEventListener("click", function() {
//     var city = searchBar.value;
//     localStorage.setItem("city", JSON.stringify(city));
//     fetchCurrentWeather(city);
// });

