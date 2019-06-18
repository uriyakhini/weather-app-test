import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun, faCloudShowersHeavy, faCloud, faCloudSun, faBolt,
        faSnowflake, faSmog, faWind, faCloudMoon, faMoon} from '@fortawesome/free-solid-svg-icons'
import './WeatherCard.css';


class WeatherCard extends React.Component {
    static propTypes = {
        tag: PropTypes.string,
        data: PropTypes.object
    }

    static WEATHER_CONDITION_TO_ICON_DAY = {
        'Rain': faCloudShowersHeavy,
        'Clouds': {'few clouds': faCloudSun,
                   'scattered clouds': faCloudSun,
                   'broken clouds': faCloudSun,
                   'overcast clouds': faCloud},
        'Thunderstorm': faBolt,
        'Clear': faSun,
        'Snow': faSnowflake,
        'Mist': faSmog,
        'Smoke': faSmog,
        'Haze': faSmog,
        'Dust': faSmog,
        'Fog': faSmog,
        'Sand': faSmog,
        'Ash': faSmog,
        'Squall': faWind,
        'Tornado': faWind,
    }

    static WEATHER_CONDITION_TO_ICON_NIGHT = {
        'Rain': faCloudShowersHeavy,
        'Clouds': {'few clouds': faCloudMoon,
                   'scattered clouds': faCloudMoon,
                   'broken clouds': faCloudMoon,
                   'overcast clouds': faCloud},
        'Thunderstorm': faBolt,
        'Clear': faMoon,
        'Snow': faSnowflake,
        'Mist': faSmog,
        'Smoke': faSmog,
        'Haze': faSmog,
        'Dust': faSmog,
        'Fog': faSmog,
        'Sand': faSmog,
        'Ash': faSmog,
        'Squall': faWind,
        'Tornado': faWind,
    }
    

    getWeatherIcon(mode) {
        if (typeof(mode) === 'undefined') mode = 'day';

        let conditionToIcon;
        if (mode === 'night') {
            conditionToIcon = WeatherCard.WEATHER_CONDITION_TO_ICON_NIGHT;
        }
        else {
            conditionToIcon = WeatherCard.WEATHER_CONDITION_TO_ICON_DAY;
        }

        let condition = this.props.data.weather[0];
        let icon = conditionToIcon[condition.main];
        if (condition.main === 'Clouds') {
            return icon[condition.description];
        }
        return icon;
    }

    render() {
        return (
            <div className='weather-card'>
                <div className='tag'>{this.props.tag}</div>
                <FontAwesomeIcon className='weather-icon' icon={this.getWeatherIcon()}/>
                <div className='temp'>{this.props.data.main.temp_max |0}C&deg;</div>
            </div>
        );
    }
}

export default WeatherCard;
