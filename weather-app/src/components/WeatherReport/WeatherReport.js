import React from 'react';
import PropTypes from 'prop-types';
import getCurrentWeather from '../../api/weatherAPI';

class WeatherReport extends React.Component {
    static propTypes = {
        location: PropTypes.string
    }

    async componentDidMount() {
        var res = await getCurrentWeather(this.props.location);
        this.setState({data: res});
    }

    async componentWillReceiveProps(nextProps){
        if (this.props.location !== nextProps.location) {
            var res = await getCurrentWeather(this.props.location);
            this.setState({data: res});
        }
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