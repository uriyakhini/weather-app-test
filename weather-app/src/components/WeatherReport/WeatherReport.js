import React from 'react';

import getWeather from '../../api/weatherAPI';
import WeatherCard from '../WeatherCard';
import CreateCard from '../CreateCard';

class WeatherReport extends React.Component {
    constructor(){
        super();
        this.addCard = this.addCard.bind(this);
        this.state = {
            cards: []
        }
    }

    async addCard(location) {
        let locationIndex = this.state.cards.map(card => card.location).indexOf(location);
        if (locationIndex !== -1) {
            return {err: 'Card already exists!'}
        }
        
        var data = await getWeather(location);
        let newCards = this.state.cards.slice();
        newCards.push({location, data});
        this.setState({cards: newCards});
    }

    render() {
        return (
            <div className='weather-report'>
                {this.state.cards.map(card => {
                    return <WeatherCard key={card.location} {...card}/>
                })}
                <CreateCard onSubmit={this.addCard}/>
            </div>
        );
    }
}

export default WeatherReport;
