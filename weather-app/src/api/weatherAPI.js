import axios from 'axios';

// Openweathermap api key.
const API_KEY = '614e59b8b1d6d7d42b026b278ac63500';

// Data renew interval, 10 minutes in milliseconds, the update rate of 
// openweathermap.
const RESEND_INTERVAL = 600000;

function cacheResponse(location, data, date){
    let cache = getCachedResponses();
    cache.push({location, data, date});
    localStorage.setItem('weatherCache', JSON.stringify(cache));
}

function getCachedResponses(){
    let stringCache = localStorage.getItem('weatherCache');
    let cache = [];

    try {
        cache = JSON.parse(stringCache);
    } catch (e) {
        // This means the cache is empty.
    }


    return Array.isArray(cache) ? cache : [];
}

function getCachedResponse(location){
    const cachedResponses = getCachedResponses();
    if (cachedResponses) {
        let cachedIndex = cachedResponses.map((response) => response.location).indexOf(location);
        if (cachedIndex !== -1){
            return cachedResponses[cachedIndex];
        }
        else {
            return undefined;
        }
    }
}

function getCurrentWeather(location, forceUpdate) {
    const getCurrentWeatherUrl = `data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    const baseUrl = 'https://api.openweathermap.org/';

    if (typeof(forceUpdate) === undefined) forceUpdate = false;

    return new Promise(function (resolve, reject) {
        let now = Date.now();

        // Check if there is cached data for the requested location. 
        if (!forceUpdate) {          
            let cachedResponse = getCachedResponse(location);
            if (cachedResponse && now - cachedResponse.date < RESEND_INTERVAL){
                resolve(cachedResponse.data);
            }
        }

        // Query the server in case no cached data exists or the query is forced.
        axios({
            url: getCurrentWeatherUrl,
            baseURL: baseUrl,
            method: 'GET'
        })
        .then(res => res.data)
        .then(res => {
            if (resolve) {
                cacheResponse(location, res, Date.now());
                resolve(res);
            }
            else {
                reject({ message: 'Bad response' });
            }
        })
    });
}

export default getCurrentWeather;
