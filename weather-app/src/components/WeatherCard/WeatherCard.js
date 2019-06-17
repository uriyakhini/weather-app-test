import React from 'react';
import PropTypes from 'prop-types';

class WeatherCard extends React.Component {
    static propTypes = {
        data: PropTypes.object
    }

    render() {
        return (
            <div className='weather-card'>
            </div>
        );
    }
}

export default WeatherCard;