import React from 'react';
import PropTypes from 'prop-types';

import './Forecast.css';
import WeatherCard from '../WeatherCard';

const INDEX_TO_DAY = ['Sun','Mon','Tue', 'Wed', 'Thu', 'Fri', 'Sat ']

class Forecast extends React.Component {
    static propTypes = {
        tag: PropTypes.string,
        data: PropTypes.object
    }

    constructor() {
        super();
        this.state = {
            cards: []
        };     
    }

    formatTag(unixDate) {
        let date = new Date(unixDate * 1000);
        let today = new Date().getDay();
        let formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
        let weekday = INDEX_TO_DAY[date.getDay()]

        console.log();

        if (date.getDay() === today) {
            weekday = 'Today';
        }

        return `${weekday} (${formattedDate})`;
    }

    parseData(data) {
        let dayForecasts = [];

        data.list.forEach((forecast) => {
            let tag = this.formatTag(forecast.dt);
            let tagIndex = dayForecasts.map((dayForecast) => dayForecast.tag).indexOf(tag);

            if (tagIndex !== -1) {
                let dayForecast = dayForecasts[tagIndex].data;
                if (forecast.main.temp_max > dayForecast.main.temp_max){
                    dayForecast.main.temp_max = forecast.main.temp_max;
                }
                if (forecast.main.temp_min > dayForecast.main.temp_min){
                    dayForecast.main.temp_min = forecast.main.temp_min;
                }
            }
            else {
                console.log(forecast.dt_txt);
                dayForecasts.push({tag, data: forecast});
            }
        })

        this.setState({cards: dayForecasts});
    }

    componentDidMount() {
        this.parseData(this.props.data);
        this.props.setWidth(this.state.cards.length * 120);
    }

    componentWillReceiveProps(nextProps) {
        this.parseData(nextProps.data);
    }

    render() {
        return (
            <div className='forecast-root'>
                <div className='forecast-tag'>{this.props.tag.replace(',', ', ')}</div>
                <div className='forecast'>
                    {this.state.cards.map((card) => {
                        return <WeatherCard key={card.tag.split(' ')[0]} {...card}/>;
                    })}
                </div>
            </div>
        );
    }
};

export default Forecast;
