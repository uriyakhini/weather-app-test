import React from 'react';
import PropTypes from 'prop-types';

class WeatherReport extends React.Component {
    static propTypes = {
        location: PropTypes.string
    }

    render() {
        return (
            <div className='weather-report'>
                <div className='location'>
                    {this.props.location}
                </div>
            </div>
        );
    }
}

export default WeatherReport;