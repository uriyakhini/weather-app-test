import React from 'react';

import getCurrentWeather from '../../api/weatherAPI';
import WeatherCard from '../WeatherCard';

class WeatherReport extends React.Component {
    constructor(){
        super();
        this.state = {
            cards: []
        }
    }

    async addCard(location) {
        let locationIndex = this.state.cards.map(card => card.location).indexOf(location);
        if (locationIndex !== -1) {
            return {err: 'Card already exists!'}
        }
        
        var data = await getCurrentWeather(location);
        let newCards = this.state.cards.slice();
        newCards.push({location, data});
        this.setState({cards: newCards});
    }

    render() {
        return (
            <div className='weather-report'>
                {this.state.cards.map(card => {
                    return <WeatherCard data={card.data} location={card.location}/>
                })}
            </div>
        );
    }
}

export default WeatherReport;
