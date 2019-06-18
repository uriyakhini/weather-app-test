import React from 'react';
import PropTypes from 'prop-types';

import './Forecast.css';
import WeatherCard from '../WeatherCard';

const INDEX_TO_DAY = ['Sunday','Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

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
        let formattedDate = + date.getDate() + '/' + date.getMonth();
        let weekday = INDEX_TO_DAY[date.getDay()]

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
                dayForecasts.push({tag, data: forecast});
            }
        })

        this.setState({cards: dayForecasts});
    }

    componentDidMount() {
        this.parseData(this.props.data);
    }

    componentWillReceiveProps(nextProps) {
        this.parseData(nextProps.data);
    }

    render() {
        return (
            <div className='forecast-root'>
                <div className='forecast-tag'>{this.props.tag}</div>
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
