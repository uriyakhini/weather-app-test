import React from 'react';
import PropTypes from 'prop-types';

import './WeatherCard.css';

class WeatherCard extends React.Component {
    static propTypes = {
        tag: PropTypes.string,
        data: PropTypes.object
    }

    render() {
        return (
            <div className='weather-card'>
                <div className='tag'>{this.props.tag}</div>
                <ul>
                    <li>Temperture: {this.props.data.main.temp |0}</li>
                    <li>Humidity: {this.props.data.main.humidity}</li>
                    <li>Condition: {this.props.data.weather[0].main}</li>
                </ul>
            </div>
        );
    }
}

export default WeatherCard;
