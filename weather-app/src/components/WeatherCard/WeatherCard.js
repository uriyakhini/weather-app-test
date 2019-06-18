import React from 'react';
import PropTypes from 'prop-types';

import './WeatherCard.css';

class WeatherCard extends React.Component {
    static propTypes = {
        location: PropTypes.string,
        data: PropTypes.object
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.location === this.props.location){
            return false;
        }
        return true;
    }

    render() {
        let tag = this.props.location;
        tag = tag.replace(',', ', ');
        return (
            <div className='weather-card'>
                <div className='tag'>{tag}</div>
                <ul>
                    <li>Temperture: {this.props.data.main.temp}</li>
                    <li>Humidity: {this.props.data.main.humidity}</li>
                    <li>Condition: {this.props.data.weather[0].main}</li>
                </ul>
            </div>
        );
    }
}

export default WeatherCard;
