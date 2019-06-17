import React from 'react';
import PropTypes from 'prop-types';
import getCurrentWeather from '../../api/weatherAPI';
import WeatherCard from '../WeatherCard';

class WeatherReport extends React.Component {
    static propTypes = {
        location: PropTypes.string
    }

    constructor(){
        super();
        this.state = {
            data: ''
        }
    }

    async componentDidMount() {
        var res = await getCurrentWeather(this.props.location);
        this.setState({data: res});
    }

    async componentWillReceiveProps(nextProps){
        if (this.props.location !== nextProps.location) {
            var res = await getCurrentWeather(nextProps.location);
            this.setState({data: res});
        }
    }

    render() {
        return (
            <div className='weather-report'>
                {this.state.data ? <WeatherCard data={this.state.data}
                                                location={this.props.location}/> : ''}
            </div>
        );
    }
}

export default WeatherReport;
