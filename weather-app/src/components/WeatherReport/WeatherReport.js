import React from 'react';

import getWeather from '../../api/weatherAPI';
import Forecast from '../Forecast';
import SearchBar from '../SearchBar';
import ExtendedWeatherCard from '../ExtendedWeatherCard';

class WeatherReport extends React.Component {
    constructor(){
        super();
        this.handleLocation = this.handleLocation.bind(this);

        this.state = {
            location: undefined,
            forecast: undefined,
            currentWeather: undefined,
        }
    }

    handleLocation(location) {
        if (!location || (this.state.location && location === this.state.location)) {
            return;
        }
        this.setState({location}, () => this.getForecast());
    }

    async getCurrentWeather() {
        var data = await getWeather(this.state.location);
        this.setState({currentWeather: {tag: "Now", data, width: Math.floor(this.state.forecast.data.list.length / 8 - 2) * 120 }});
    }

    async getForecast() {
        var data = await getWeather(this.state.location, 'forecast');
        let forecast = {tag: this.state.location, data};
        this.setState({forecast}, () => this.getCurrentWeather());
    }

    render() {
        return (
            <div className='weather-report'>
                <div>
                    <SearchBar id="forecast-search" onSubmit={this.handleLocation}/>
                    {this.state.forecast ? <Forecast {...this.state.forecast}/> : ''}
                    {this.state.currentWeather ? <ExtendedWeatherCard {...this.state.currentWeather}/> : ''}
                </div>
            </div>
        );
    }
}

export default WeatherReport;
