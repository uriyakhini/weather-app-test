import axios from 'axios';

import API_KEYS from '../api-keys.conf';

// Data renew interval, 10 minutes in milliseconds, the update rate of 
// openweathermap.
const RESEND_INTERVAL = 600000;

function cacheResponse(location, data, date, mode){
    let cache = getCachedResponses(mode);
    let cachedIndex = cache.map(response => response.location).indexOf(location);

    if (cachedIndex !== -1) {
        cache.splice(cachedIndex, 1);
    }
    cache.push({location, data, date});
    localStorage.setItem(`${mode}Cache`, JSON.stringify(cache));
}

function getCachedResponses(mode){
    let stringCache = localStorage.getItem(`${mode}Cache`);
    let cache = [];

    try {
        cache = JSON.parse(stringCache);
    } catch (e) {
        // This means the cache is empty.
    }
    return Array.isArray(cache) ? cache : [];
}

function getCachedResponse(location, mode){
    const cachedResponses = getCachedResponses(mode);
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

function getWeather(location, mode, forceUpdate) {
    if (typeof(mode) === "undefined") mode = 'weather';
    if (typeof(forceUpdate) === "undefined") forceUpdate = false;

    const getCurrentWeatherUrl = `data/2.5/${mode}?q=${location}&appid=${API_KEYS.openWeatherMap}&units=metric`;
    const baseUrl = 'https://api.openweathermap.org/';

    return new Promise(function (resolve, reject) {
        let now = Date.now();

        // Check if there is cached data for the requested location. 
        if (!forceUpdate) {          
            let cachedResponse = getCachedResponse(location, mode);

            if (cachedResponse && now - cachedResponse.date < RESEND_INTERVAL){
                resolve(cachedResponse.data);
                return;
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
                cacheResponse(location, res, Date.now(), mode);
                resolve(res);
            }
            else {
                reject({ message: 'Bad response' });
            }
        })
    });
}

export default getWeather;
