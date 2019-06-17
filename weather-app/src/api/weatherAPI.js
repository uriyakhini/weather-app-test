import axios from 'axios';

// Openweathermap api key.
const API_KEY = '614e59b8b1d6d7d42b026b278ac63500';

function getCurrentWeather(location) {
    const getCurrentWeatherUrl = `data/2.5/weather?q=${location}&appid=${API_KEY}`;
    const baseUrl = 'https://api.openweathermap.org/';
    return new Promise(function (resolve, reject) {
        axios({
            url: getCurrentWeatherUrl,
            baseURL: baseUrl,
            method: 'GET'
        })
        .then(res => res.data)
        .then(res => {
            if (resolve) {
                resolve(res);
            }
            else {
                reject({ message: 'Bad response' });
            }
        })
    });
}

export default getCurrentWeather;