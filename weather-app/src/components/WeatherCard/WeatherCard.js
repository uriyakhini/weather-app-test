import React from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSun, faCloudShowersHeavy, faCloud, faCloudSun, faBolt,
        faSnowflake, faSmog, faWind} from '@fortawesome/free-solid-svg-icons'
import './WeatherCard.css';


class WeatherCard extends React.Component {
    static propTypes = {
        tag: PropTypes.string,
        data: PropTypes.object
    }

    static WEATHER_CONDITION_TO_ICON = {
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
    

    getWeatherIcon() {
        let condition = this.props.data.weather[0];
        let icon = this.WEATHER_CONDITION_TO_ICON[condition.main];
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
