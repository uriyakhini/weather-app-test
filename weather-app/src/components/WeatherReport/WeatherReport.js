import React from 'react';

import getWeather from '../../api/weatherAPI';
import Forecast from '../Forecast';
import SearchBar from '../SearchBar';

class WeatherReport extends React.Component {
    constructor(){
        super();
        this.addCard = this.addCard.bind(this);
        this.getForecast = this.getForecast.bind(this);
        this.setWidth = this.setWidth.bind(this);
        this.state = {
            forecast: undefined,
            cards: [],
            width: 0
        }
    }

    setWidth(width) {
        this.setState({width});
    }

    async addCard(location) {
        let locationIndex = this.state.cards.map(card => card.location).indexOf(location);
        if (locationIndex !== -1) {
            return {err: 'Card already exists!'}
        }
        
        var data = await getWeather(location);
        let newCards = this.state.cards.slice();
        newCards.push({tag: location.replace(',', ', '), data});
        this.setState({cards: newCards});
    }

    async getForecast(location) {
        if (!location || (this.state.forecast && location === this.state.forecast.tag)) {
            return;
        }
        var data = await getWeather(location, 'forecast');
        let forecast = {tag: location, data};
        this.setState({forecast});
    }

    render() {
        return (
            <div className='weather-report'>
                <div>
                    <SearchBar id="forecast-search" onSubmit={this.getForecast}/>
                    {this.state.forecast ? <Forecast setWidth={this.setWidth} {...this.state.forecast}/> : ''}
                </div>
            </div>
        );
    }
}

export default WeatherReport;
