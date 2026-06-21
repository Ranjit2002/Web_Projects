// const data = null;

// const xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener('readystatechange', function () {
//     if (this.readyState === this.DONE) {
//         // 1. Parse the JSON string into an object
//         const responseData = JSON.parse(this.responseText);

//         // 2. Get the closest forecast (the first item in the list)
//         const currentForecast = responseData.list[0];

//         // 3. Get the city data (which contains sunrise and sunset)
//         const cityData = responseData.city;

//         // 4. Extract your requested data points into a neat object
//         const myWeatherObj = {
//             cloud_pct: currentForecast.clouds.all,
//             feels_like: currentForecast.main.feels_like,
//             humidity: currentForecast.main.humidity,
//             max_temp: currentForecast.main.temp_max,
//             min_temp: currentForecast.main.temp_min,
//             temp: currentForecast.main.temp,
//             wind_degrees: currentForecast.wind.deg,
//             wind_speed: currentForecast.wind.speed,
//             sunrise: cityData.sunrise,
//             sunset: cityData.sunset
//         };

//         // Log the clean, extracted data
//         console.log("Extracted Weather Data:", myWeatherObj);
//     }
// });

// xhr.open('GET', 'https://open-weather13.p.rapidapi.com/fivedaysforcast?latitude=40.730610&longitude=-73.935242&lang=EN');

// // Remember to keep your API keys secure!
// xhr.setRequestHeader('x-rapidapi-key', '7f92b759ffmshb4d189d8342033ep1aa8a2jsnc1c3511c5865');
// xhr.setRequestHeader('x-rapidapi-host', 'open-weather13.p.rapidapi.com');
// xhr.setRequestHeader('Content-Type', 'application/json');

// xhr.send(data);


// 922cc0f802dd479699b152615262305

// https://api.weatherapi.com/v1/current.json?key=922cc0f802dd479699b152615262305&q=London&aqi=yes

/*

const url = 'https://api.weatherapi.com/v1/current.json?key=922cc0f802dd479699b152615262305&q=mumbai&aqi=yes';

fetch(url)
    .then(data => {
        if (!data.ok) {
            throw new Error('Network data was not ok');
        }
        return data.json(); // 1. Parse the JSON
    })
    .then(data => {
        // 2. Extract exactly the fields you asked for
        const extractedData = {
            // Location Data
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            tz_id: data.location.tz_id,

            // Current Weather Data
            temp_c: data.current.temp_c,
            temp_f: data.current.temp_f,
            // temp: data.current.temp_c, // Using Celsius as the default 'temp'
            humidity: data.current.humidity,
            wind_kph: data.current.wind_kph,
            // wind_mph: data.current.wind_mph,
            wind_dir: data.current.wind_dir,
            wind_mph: data.current.wind_mph, // Using kph as the default 'wind_speed'
            wind_degrees: data.current.wind_degree,

            feelslike_c: data.current.feelslike_c,

            cloud: data.current.cloud,
            vis_km: data.current.vis_km,
            will_it_rain: data.current.will_it_rain,
            will_it_snow: data.current.will_it_snow,

            // Note: max_temp and min_temp cannot be extracted from /current.json
            // max_temp: "Not available in /current endpoint",
            // min_temp: "Not available in /current endpoint"
        };

        // 3. Log the result
        console.log("WeatherAPI Data:", extractedData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });


 */


const getWeather = (city) => {

    cityName.innerHTML = city;

    const url = `https://api.weatherapi.com/v1/current.json?key=922cc0f802dd479699b152615262305&q=${city}&aqi=yes`;

    fetch(url)


        .then(response => response.json())
        .then((data) => {
            console.log(data);

            document.getElementById('temp').innerHTML = data.current.temp_c;
            document.getElementById('name').innerHTML = data.location.name;
            document.getElementById('region').innerHTML = data.location.region;
            document.getElementById('country').innerHTML = data.location.country;

            document.getElementById('humidity2').innerHTML = data.current.humidity;
            document.getElementById('humidity').innerHTML = data.current.humidity;
            document.getElementById('feelslike').innerHTML = data.current.feelslike_c;
            document.getElementById('cloud').innerHTML = data.current.cloud;

            document.getElementById('wind_speed2').innerHTML = data.current.wind_kph;
            document.getElementById('wind_speed').innerHTML = data.current.wind_kph;
            document.getElementById('wind_dir').innerHTML = data.current.wind_dir;
            document.getElementById('wind_degree').innerHTML = data.current.wind_degree;

        })
        .catch(err => console.log(err));

}


submit.addEventListener("click", (e) => {
    e.preventDefault();
    getWeather(city.value);
    city.value = "";
})

getWeather('Delhi');