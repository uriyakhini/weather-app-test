import React from 'react';
import PropTypes from 'prop-types';

class WeatherCard extends React.Component {
    static propTypes = {
        data: PropTypes.object
    }

    render() {
        return (
            <div className='weather-card'>
                <ul>
                    <li>Temperture: {this.props.data.main.temp}</li>
                    <li>Humidity: {this.props.data.main.humidity}</li>
                </ul>
            </div>
        );
    }
}

export default WeatherCard;